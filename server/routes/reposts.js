import RepostModel from '../models/Repost';
import { doRepost } from '../helpers/vk';

export default (app) => {

    app.get('/api/reposts', async (req, res, next) => {
        const { city } = req.query;

    const data = await RepostModel.find({ city, status: 'awaiting' }).sort({ dateCreated: -1 })

    res.status(200).send(data)
    });


    app.get('/api/repost', async (req, res, next) => {
        const { _id } = req.query;

    const data = await RepostModel.find({ city, _id });

    debugger;
    res.status(200).send(data)
    });

    // статусы:
// active
// awaiting
// declined

    // app.patch('/api/reposts', async (req, res, next) => {
    //     const { _id, confirm, userToken } = req.body;

    //     const status = confirm ? 'active' : 'declined';
    //     const t  = await RepostModel.findByIdAndUpdate({ _id }, { status });
    //     console.log(t);

    //     if (status === 'active') {
    //         const id = t.toJSON().id;
    //         debugger;
    //         doRepost(id, userToken);
    //     }

    //   });
    
  }
  