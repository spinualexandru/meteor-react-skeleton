import React, { Component, PropTypes } from 'react';
import { Grid, Menu, Segment, Button, Header, Dimmer, Loader, Input, Dropdown, Divider, Icon, Step, Table } from 'semantic-ui-react'
import faker from 'faker'
import SideList from '../components/sideList/sideList.jsx';
import { HTTP } from 'meteor/http'
import JobLister from './../components/jobLister/jobLister.jsx';

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
        Meteor.call('bot.get', 'worker', function (err, data) {
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
    render() {
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
                                    content='Every tab represents a worker'
                                     image='https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_arrow_down_48px-128.png'
                                    subheader='The worker is the bot that adds people on LinkedIn'
                                />
                                    <Grid centered columns={2}>
                                        <SideList items={bots} handleBotChange={this.handleBotChange.bind(this)} />
                                        {this.state.activeBot && this.state.activeBot.ip &&
                                                      <JobLister ip={this.state.activeBot.ip}/>
                                        }
                                    </Grid>
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
