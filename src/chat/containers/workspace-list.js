import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { chat as ChatActions } from '../../core/actions'
import WorkSpaceListItem from '../components/workspace-list-item'



class WorkspaceListContainer extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { getWorkspaces } = this.props

    getWorkspaces()
  }

  render() {
    const { workspaces, navigate } = this.props

    return(
      <div className="workspace-list">
        <ul>
          <li>
            <span><h3>Name</h3></span>
            <span><h3>URL</h3></span>
          </li>
          {
            workspaces && workspaces.map((workspace, index) => 
              <WorkSpaceListItem
                key={index}
                workspace={workspace}
                onItemClick={() => navigate(`/${workspace.name}`)}
              />
            )
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  workspaces: state.chat.workspaces
})

const mapDispatchToProps = dispatch=> ({
  getWorkspaces: () => dispatch(ChatActions.getWorkspaceAttempt()),
  navigate: (link) => dispatch(push(link))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceListContainer)