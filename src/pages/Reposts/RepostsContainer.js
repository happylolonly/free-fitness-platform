import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import { api } from '../../config';
import moment from 'moment';

import url from 'url';

import './StateComponent.css';


const propTypes = {

};

class StateComponent extends Component {
  constructor() {
    super();

    this.state = {
      reposts: [],
    }

    this.getReposts = this.getReposts.bind(this);
  }

  componentDidMount() {
    // const paths = url.parse(window.location.href, true);

    // var hash = window.location.hash.substring(1);
    // var params = {}
    // hash.split('&').map(hk => { 
    //   let temp = hk.split('='); 
    //     params[temp[0]] = temp[1] 
    // });

    // console.log(params); //Here are the params to use
    // debugger;
    // if (params['access_token']) {
    //   localStorage.setItem('token', params['access_token']);
    //   window.location.hash = '';
    // } else if (!localStorage.getItem('token')) {
    //  this.redirect(); 
    // }

    this.getReposts();
  }

  redirect() {
    // axios.get('https://oauth.vk.com/authorize?client_id=6693912&display=page&redirect_uri=http://example.com/callback&scope=wall&response_type=token&v=5.85&state=123456')
    window.location = 'https://oauth.vk.com/authorize?client_id=6693912&display=page&redirect_uri=localhost:3000&scope=wall&response_type=token&v=5.85&state=123456'
  }

  async getReposts() {
      const data = await axios.get(`${api}/reposts`, { params: {
        city: 'minsk',
      }});

      const reposts = data.data;


      this.setState({ reposts });
  }

  async confirmRepost(id, confirm) {

    try {

      await axios.patch(`${api}/reposts`, {
        _id: id,
        confirm,
        userToken: localStorage.getItem('token'),

      });

      this.forceUpdate();


    } catch (error) {
      console.log(error);
    }
    

    // const reposts = data.data;

    // debugger;



    // this.setState({ reposts });
}

  handleClick(id, confirm) {
    return;
    this.confirmRepost(id, confirm);
  }

  render() {
    return (
      <div className="reposts-page">

      <h2>Мероприятия которых у нас нету в группе</h2>

        {this.state.reposts.map(item => {
          const { _id, id, dateCreated, group } = item;

          return (
            <div key={_id} className="repost">
              <a href={`https://vk.com/${group}?w=wall${id}`}>{`https://vk.com/${group}?w=wall${id}`}</a>
              <p>Дата: {moment(dateCreated).format('DD MM YYYY')}</p>
              <p>Группа: {group}</p>

              <button className="" onClick={() => this.handleClick(_id, true)}>Подтвердить</button>
              <button className="" onClick={() => this.handleClick(_id, false)}>Отклонить</button>
            </div>
          )
        })}
        
      </div>
    )
  }
}

StateComponent.propTypes = propTypes;

export default StateComponent;
