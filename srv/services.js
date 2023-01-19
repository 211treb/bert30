const cds = require('@sap/cds');
cds.env.features.fetch_csrf = true
class Service extends cds.ApplicationService {
    async init() {
        this.on('READ', 'Equipments', async (req) => {
            var results = []

            var q = {
                select: ['equipmentId', 'internalId', 'modelName', 'description'],
                filter: {
                    filters: [],
                    'and': true
                }
            }

            if (req.query.SELECT?.where != undefined) {
                console.log('req.query.SELECT?.where[0].args[1].val > ' + JSON.stringify(req.query.SELECT?.where[0].args[1].val))
                q.search = req.query.SELECT.where[0].args[1].val
            }


            if (Object.keys(req.data).length != 0) {
                q.filter.filters.push({
                    operator: 'EQ',
                    value1: req.data.equipmentId,
                    path: 'equipmentId'
                });
            }

            const api = await cds.connect.to("AIN_SERVICES_V1");
            console.log('q > ' + JSON.stringify(q))
            await api.tx(req).put("/search/equipment", q).then((r) => {

                r.value.forEach((e) => {
                    results.push({
                        equipmentId: e.equipmentId,
                        internalId: e.internalId,
                        modelName: e.modelName,
                        shortDescription: e.description.short,
                        longDescription: e.description.long
                    })
                })
            })
            return results
        });


    }
}

module.exports = { Service }