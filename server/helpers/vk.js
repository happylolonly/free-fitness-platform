import VK from 'vk-io';
import { uniq } from 'lodash';
import { get } from 'http';

import config from '../configs/config.env';
import configC from '../configs/config';

// import logger from 'logger';

import RepostModel from '../models/Repost';

const { app, key, token } = config.vk;

const vk = new VK();

vk.setToken('4e82e2084e82e2084e82e208a74ee4c61044e824e82e208151f9677d3d62856454ed2e6');

const WORDS = configC.cities.minsk.words;

async function getReposts(group, wordsType) {
  const reposts = [];
  const promises = [];

  try {
    WORDS[wordsType].forEach(word => {
      promises.push(
        (() => {
          console.log('Search:', group, 'word', word);
          return vk.api.wall
            .search({
              domain: group,
              query: `${word}`,
              count: 10
            })
            .catch(error => {
              console.log(error);
            });
        })()
      );
    });

    const data = await Promise.all(promises);

    data.forEach(item => {
      item.items.forEach(item2 => {
        const { id, owner_id, date } = item2;

        reposts.push({
          date: date,
          id: `${owner_id}_${id}`,
          group,
          city: 'minsk'
        });
      });
    });
    // todo
    // const filteredLinks = _.uniq(peoplenames);

    return reposts;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// function checkNewPosts (newLinks) {

// }

async function getOurReposts(ourGroup) {
  const reposts = [];

  try {
    const data = await vk.api.wall.get({
      domain: ourGroup,
      count: 50,
      filter: 'all'
    });

    data.items.forEach(item => {
      const { copy_history } = item;

      if (copy_history) {
        const { id, owner_id, date } = copy_history[0];

        reposts.push({
          date,
          id: `${owner_id}_${id}`
          // group: ourGroup,
          // city:
        });
      }
    });
  } catch (error) {
    console.log(error);
  }

  return reposts;
}

async function getNewOurPosts(reposts) {
  const newReposts = [];

  for (const item of reposts) {
    const repost = await RepostModel.findOne({ id: item.id });

    if (!repost) {
      newReposts.push(item);
    }
  }

  return newReposts;
}

async function resetHiddenStatus() {
  try {
    const repost = await RepostModel.find({ status: 'hidden' });

    if (repost.length) {
      for (const item of repost) {
        // можно на промис all
        await RepostModel.findByIdAndUpdate({ _id: item._id }, { status: 'awaiting' });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateOurNewPosts(newReposts) {
  const promises = newReposts.map(item => {
    const { id, date } = item;
    const repost = new RepostModel({
      id,
      status: 'active',
      dateCreated: date * 1000,
      group: 'free_fitness_minsk',
      city: 'minsk'
    });

    return repost.save();
  });

  try {
    await Promise.all(promises);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function saveNewReposts(possibleRepost) {
  for (const item of possibleRepost) {
    const { id, date, group, city } = item;

    const repost = await RepostModel.findOne({ id: item.id, city, group });

    if (!repost) {
      // newReposts.push(item);

      const repost2 = new RepostModel({
        id,
        status: 'awaiting',
        dateCreated: date * 1000,
        group,
        city
      });

      await repost2.save();
    }
  }
}

export async function init(config) {
  // const { cities: { minsk:  { mainGroup } } = config;
  const { mainGroup, groupsToParse } = config.cities.minsk;

  const reposts = await getOurReposts(mainGroup);
  // await resetHiddenStatus();
  const newReposts = await getNewOurPosts(reposts);
  const t = await updateOurNewPosts(newReposts);

  for (const item of groupsToParse.free) {
    const possibleRepost = await getReposts(item, 'common');
    await saveNewReposts(possibleRepost);
  }

  for (const item of groupsToParse.commercial) {
    const possibleRepost = await getReposts(item, 'group');
    await saveNewReposts(possibleRepost);
  }

  // get reposts from another groops

  // check with ours

  // save new with statuses 'pending/awaiting'
}

export async function doRepost(id, token) {
  vk.setToken(token);

  try {
    await vk.api.wall.repost({
      object: `wall${id}`,
      group_id: 129982085
    });
  } catch (error) {
    console.log(error);
  }
}

async function getPostInfo(id) {
  try {
    const data = await vk.api.wall.getById({
      posts: `${id}`
    });
    data;

    return data;
  } catch (error) {
    console.log(error);
  }
}
