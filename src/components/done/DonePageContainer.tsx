import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getIssue } from '../shared/utils';
import { ApplicationState } from '../../redux/root';
import { newLocationLookup, clearAddress } from '../../redux/location';
import { DonePage } from './index';
import { Issue } from '../../common/model';
import { getIssuesIfNeeded } from '../../redux/remoteData';
import { selectIssueActionCreator } from '../../redux/callState';

import { RouteComponentProps } from 'react-router-dom';

interface OwnProps extends RouteComponentProps<{ id: string }> { }

interface StateProps {
  readonly issues: Issue[];
  readonly currentIssue?: Issue;
  readonly totalCount: number;
}

interface DispatchProps {
  readonly onSelectIssue: (issueId: string) => void;
  readonly onGetIssuesIfNeeded: () => void;
}

const mapStateToProps = (state: ApplicationState, ownProps: OwnProps): StateProps => {
  const currentIssue: Issue | undefined = getIssue(state.remoteDataState, ownProps.match.params.id);

  return {
    issues: state.remoteDataState.issues,
    currentIssue: currentIssue,
    totalCount: state.remoteDataState.callTotal,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>): DispatchProps => {
  return bindActionCreators(
    {
      onSelectIssue: selectIssueActionCreator,
      onGetIssuesIfNeeded: getIssuesIfNeeded,
      setLocation: newLocationLookup,
      clearLocation: clearAddress,
    },
    dispatch);
};

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(DonePage);
