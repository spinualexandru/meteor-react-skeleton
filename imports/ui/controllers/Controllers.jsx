import React, { Component, PropTypes } from 'react';
import { Grid, Menu, Segment, Button, Header, Dimmer, Loader, Input, Dropdown, Divider, Icon, Step, Table } from 'semantic-ui-react'
import faker from 'faker'
import SideList from '../components/sideList/sideList.jsx';
import { HTTP } from 'meteor/http'
import QueryList from './../components/queryLister/queryLister.jsx';

// Task component - represents a single todo item
export default class Controllers extends Component {
    constructor() {
        super();
        this.state = {
            bots: [],
            workers: [],
            PAGE_ID: FlowRouter.getParam('id'),
            activeBot: null,
            activeWorker: null,
            loading: false
        }
    }
    componentWillMount() {
        this.loadBots();
    }
    loadBots() {
        this.setState({
            loading: true
        })
        Meteor.call('bot.get', 'controller', function (err, data) {
            this.setState({
                bots: data
            });
            if (err) { console.log(err) }
            console.log(data, this.state.PAGE_ID);
            if(this.state.PAGE_ID) {
              _.each(bots, (elem, index) => {


                  if (elem._id._str === this.state.PAGE_ID) {
                      this.setState({
                          activeBot: elem,
                          PAGE_ID: elem._id._str
                      });
                      HTTP.call('GET', `http://${elem.ip}:3000/api/getBusy`, function (err, result) {
                          this.setState({
                              botStatus: !result ? true : (result.content === 'true'),
                              loading: false
                          })
                      }.bind(this));
                  }
              });
            }else{
              this.setState({
                activeBot: bots[0]
              })
            }

        }.bind(this));
        Meteor.call('bot.get', 'worker', function (err, data) {
            if (data) {

                this.setState({
                    workers: _.map(data, (elem, index) => {
                        return { key: elem._id._str, value: elem.name, text: elem.name }
                    })
                })
            }
        }.bind(this));

    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleOnChange(ev, data) {
        Meteor.call('bot.get.id', data.value, function (err, c) {
            if (c) {
                this.setState({
                    activeWorker: c
                })
                console.log(c.name);
            }

        }.bind(this))
    }
    setURL(ev, data) {
        this.setState({
            linkedin: data.value
        });
    }
    setUni(ev, data) {
        this.setState({
            university: data.value
        });
    }
    handleBotChange(data) {
        this.setState({
            PAGE_ID: data
        });
        this.loadBots();
    }
    sendRequest(ev, data) {
        const _controller = this.state.activeBot;
        const _bot = this.state.activeWorker;
        const _url = this.state.linkedin;
        const _uniCode = this.state.university;
        console.log(_uniCode);
        HTTP.call('POST', `http://${_controller.ip}:3000/api/queryPages`, {
            data: {
                username: _controller.username,
                password: _controller.password,
                controllerIp: _controller.ip,
                controllerName: _controller.name,
                bot: _bot.ip,
                url: _url,
                name: _bot.name,
                universityCode: _uniCode
            }
        }, function (err, result) {
            if (err) { console.log(err); alert('An error has occured, check the console and contact me!')}
            if (result) { console.log(result); alert('Request sent!')}
        });
    }

    alertMe(){
      alert("DOUBLE");
    }
    render() {
        const steps = [
            { icon: 'truck', title: 'Shipping', description: 'Choose your shipping options' },
            { active: true, icon: 'payment', title: 'Billing', description: 'Enter billing information' },
            { disabled: true, icon: 'info', title: 'Confirm Order' },
        ]

        bots = this.state.bots;
        if (!this.state.activeBot && this.PAGE_ID && !this.state.activeBot.name || this.state.loading && this.state.PAGE_ID) {
            return (
                <Dimmer active>
                    <Loader>Loading</Loader>
                </Dimmer>
            )
        } else {
            return (
                <div>
                    <Grid centered columns={2}>



                        <Grid.Row centered columns={1}>
                            <Grid.Column>
                                <Segment>
                                <Header
                                    as='h2'
                                    content='Every tab represents a controller'
                                     image='https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_arrow_down_48px-128.png'
                                    subheader='The controller is the bot that gathers the public links'
                                />
                                    <Grid centered columns={2}>

                                        <SideList items={bots} handleBotChange={this.handleBotChange.bind(this)} />
                                        <Grid.Row centered columns={2}>
                                            <Grid.Column>
                                                {
                                                    this.state.activeBot && this.state.activeBot.name &&
                                                    <Header
                                                        textAlign='center'
                                                        as='h2'
                                                        content={`Selected bot: ${this.capitalizeFirstLetter(this.state.activeBot.name)}`}
                                                        subheader='Complete all the 3 steps then press "Send Request" to add a job to the queue'
                                                    />
                                                }<Grid centered columns={2}>
                                                    <Grid.Row centered columns={6}>
                                                        {typeof this.state.botStatus === "boolean" ?
                                                            <Button
                                                                color='green'
                                                                content='Send Request'
                                                                onDoubleClick= {this.sendRequest.bind(this)}
                                                                icon={this.state.botStatus == false ? 'checkmark' : 'remove'}
                                                                label={{color: this.state.botStatus == false ? 'green' : 'red', pointing: 'left', content: this.state.botStatus == false ? 'Bot is ready to use' : 'Bot is not available' }}
                                                            />
                                                            :
                                                            <Button
                                                                color='orange'
                                                                content='Check'
                                                                icon='clock'

                                                                label={{ basic: true, color: 'orange', pointing: 'left', content: 'Checking...' }}
                                                            />
                                                        }
                                                    </Grid.Row>
                                                </Grid>
                                                <Step.Group>
                                                    <Step>
                                                        <Icon name='github alternate' />
                                                        <Step.Content>
                                                            <Step.Title>Select a bot</Step.Title>
                                                            <Step.Description>
                                                                <Dropdown
                                                                    placeholder='Who sends the invite'
                                                                    search
                                                                    selection
                                                                    options={this.state.workers}
                                                                    onChange={this.handleOnChange.bind(this)}
                                                                />
                                                            </Step.Description>
                                                        </Step.Content>
                                                    </Step>

                                                    <Step>
                                                        <Icon name='university' />
                                                        <Step.Content>
                                                            <Step.Title>University Code</Step.Title>
                                                            <Step.Description>
                                                                <Input
                                                                    placeholder="e.g. WHU"
                                                                    onChange={this.setUni.bind(this)}
                                                                />
                                                            </Step.Description>
                                                        </Step.Content>
                                                    </Step>
                                                    <Step>
                                                        <Icon name='linkedin' />
                                                        <Step.Content>
                                                            <Step.Title>LinkedIn URL</Step.Title>
                                                            <Step.Description>
                                                                <Input
                                                                    placeholder="Example: https://www.linkedin.com/recruiter/smartsearch/clipboard?searchHistoryId=1545148636&searchCacheKey=63de4b02-0f87-45bf-8f21-ff1b03ec2a94%2Cgsdm&linkContext=Controller%3AsmartSearch%2CAction%3Asearch%2CID%3A1545148636&doExplain=false&start=0"
                                                                    onChange={this.setURL.bind(this)}

                                                                />
                                                            </Step.Description>
                                                        </Step.Content>
                                                    </Step>
                                                </Step.Group>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    <Header
                                        textAlign='center'
                                        as='h2'
                                        content='Controller Queue Status'
                                        subheader='Below you can see the job queue linked to this controller'
                                    />
                                    {this.state.activeBot && this.state.activeBot.ip &&
                                                  <QueryList ip={this.state.activeBot.ip}/>
                                    }



                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </div>
            );
        }

    }
}

Controllers.propTypes = {};
