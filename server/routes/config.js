import config from '../configs/config';

export default app => {

    app.get('/api/groups', (req, res) => {

        // config.sities

        const { groupsToParse, words } = config.cities.minsk;

        res.send({
            city: 'minsk',
            groupsToParse,
            words,
        })

    })
}
