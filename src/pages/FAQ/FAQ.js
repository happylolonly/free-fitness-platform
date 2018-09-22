import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import './FAQ.css';


const propTypes = {

};

class FAQ extends React.Component {

  constructor() {
    super();

    this.state = {
      city: null,
      groupsToParse: [],
            words: [],
    }
  }

  componentDidMount() {
    this.loadInfo();
  }

  async loadInfo() {

    try {
      const data = await axios.get('/api/groups');

      this.setState({ ...data.data })
    }

    catch(er) {
      console.log(er);
    }
  }


  render() {

    return (
      <div className="faq-page">
  
      <h2>FAQ</h2>
  
      <p>Приложение позволяет автоматически проверять наши необходимые группы (потом будет список) по определенным словам ( тоже будет список ) и получать эти посты. Если этих постов на данный момент нету в нашей группе, они будут показаны в списке (от самого раннего по дате). По нажатии на ссылку пост можно просмотреть, и если он подходит, сделать репост. После чего необходимо либо подтвердить либо отклонить ( если нашлось то что нам не подходит) нажав на кнопку с этим репостом ( чтобы сохранилось на сервере). На данный момент ВК не позволяет это удобнее сделать ( но я подумаю еще варианты).</p>
  
      <p>Еще есть нюанс, что сейчас сайт на бесплатном хостинге, который может "уснуть" и необходимо будет подождать около 10-20 сек пока он проснется.
  После чего на сервере запустятся проверки новых постов с групп. Если на момент захода на сайт постов в списке не будет, лучше через минуту обновить страницу, возможно появятся новые после обновления.</p>
  
      <p>Пока быстро и абы как, но потом будет лучше)</p>


      <p>------</p>

      <p>Город {this.state.city}</p>

      <p>Группы для проверки:</p>

      {this.state.groupsToParse.map(item => {
        return (
          // <p>{item}</p>
          <a target="_blank" href={`https://www.vk.com/${item}`}>{`https://www.vk.com/${item}`}</a>
        )
      })}

            <p>Слова для проверки:</p>
            {this.state.words.join(' ')};



        
      </div>
    );

  }
  

};

FAQ.propTypes = propTypes;

export default FAQ;






