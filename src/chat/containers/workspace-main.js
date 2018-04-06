import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { chat as ChatActions } from '../../core/actions'

import { AddWorkspace, WorkspaceList } from './index'

const WorkspaceContainer = ({ createWorkspace }) =>
  <div className="container workspace clearfix">
    <Tabs>
      <TabList>
        <Tab>Create Workspace</Tab>
        <Tab>Workspace List</Tab>
      </TabList>

      <TabPanel>
        <div className="form workspace">
          <AddWorkspace onSubmit={createWorkspace}/>
        </div>
      </TabPanel>
      <TabPanel>
        <WorkspaceList />
      </TabPanel>
    </Tabs>
  </div>


const mapDispatchToProps = dispatch => ({
  createWorkspace: (data) => {
    dispatch(ChatActions.createWorkspaceAttempt({
      displayName: data.displayName,
      email: data.email,
      name: data.name,
      password: data.password
    }));
  }
})

export default connect(null, mapDispatchToProps)(WorkspaceContainer)
