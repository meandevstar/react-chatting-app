import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';

import { chat as ChatActions } from '../../core/actions'

import { AddWorkspace, WorkspaceList, FindWorkspace } from './index'

const WorkspaceContainer = ({ createWorkspace, findWorkspace }) =>
  <div className="container workspace clearfix">
    <Tabs>
      <TabList>
        <Tab>Workspace List</Tab>
        <Tab>Create Workspace</Tab>
        <Tab>Find Workspace</Tab>
      </TabList>

      <TabPanel>
        <WorkspaceList />
      </TabPanel>
      <TabPanel>
        <div className="form workspace">
          <AddWorkspace onSubmit={createWorkspace}/>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="form workspace">
          <FindWorkspace onSubmit={findWorkspace}/>
        </div>
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
    }))
  },
  findWorkspace: (data) => {
    dispatch(ChatActions.findWorkspace(data.email))
  }
})

export default connect(null, mapDispatchToProps)(WorkspaceContainer)
