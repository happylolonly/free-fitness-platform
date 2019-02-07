import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import './FAQ.css';

const propTypes = {};

class FAQ extends React.Component {
  constructor() {
    super();

    this.state = {
      city: null,
      groupsToParse: {
        free: [],
        commercial: []
      },
      words: {
        group: [],
        common: []
      }
    };
  }

  componentDidMount() {
    this.loadInfo();
  }

  async loadInfo() {
    try {
      const data = await axios.get('/api/groups');

      this.setState({ ...data.data });
    } catch (er) {
      console.log(er);
    }
  }

  render() {
    return (
      <div className="faq-page">
        <h2>FAQ</h2>
        <p>
          Приложение позволяет автоматически проверять наши необходимые группы (список ниже, можно и
          нужно предлагать новые ) по определенным словам ( список тоже ниже ) и получать эти посты.
          Если этих постов на данный момент нету в нашей группе, они будут показаны в списке (от
          самого раннего по дате). По нажатии на ссылку пост можно просмотреть, и если он подходит,
          сделать репост. После чего необходимо нажать на кнопку "Просмотрено" чтобы он пропал из
          списка. Хотелось сделать еще более удобнее, но на данный момент ВК не позволяет это
          удобнее сделать ( но может будут еще варианты).
        </p>
        <p>
          Еще есть нюанс, что сейчас сайт на бесплатном хостинге, который может "уснуть" и
          необходимо будет подождать около 10-20 сек пока он проснется. После чего на сервере
          запустятся проверки новых постов с групп. Если на момент захода на сайт постов в списке не
          будет, лучше через минуту обновить страницу, возможно появятся новые после обновления.
        </p>
        <p>Пока быстро и абы как, но потом будет лучше)</p>
        <p>
          Предлагайте тоже что можно сделать удобнее/баги и тд, рутиной может заниматься комп, люди
          могут делать более интересные штуки)
        </p>
        <hr />
        <p>Город {this.state.city}</p>
        <p>Группы для проверки (общие):</p>
        {this.state.groupsToParse.free.map(item => {
          return (
            // <p>{item}</p>
            <a
              target="_blank"
              href={`https://www.vk.com/${item}`}
            >{`https://www.vk.com/${item}`}</a>
          );
        })}
        <hr />
        <p>Со Словами для проверки:</p>
        {this.state.words.common.join(' ')};
        <hr />
        <p>Группы для проверки (целевые):</p>
        {this.state.groupsToParse.commercial.map(item => {
          return (
            // <p>{item}</p>
            <a
              target="_blank"
              href={`https://www.vk.com/${item}`}
            >{`https://www.vk.com/${item}`}</a>
          );
        })}
        <p>Со Словами для проверки:</p>
        {this.state.words.group.join(' ')};
        <hr />
      </div>
    );
  }
}

FAQ.propTypes = propTypes;

export default FAQ;
