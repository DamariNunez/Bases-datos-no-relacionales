db.contrato.aggregate(
[
    {
        $match: {
            _id: ObjectId("62ae07fda44ae12319d101e2")
        }
    },
    {
        $lookup: {
            from: "comprador",
            localField: "idComprador",
            foreignField: "_id",
            as: "comprador"
        }
    }
]
).pretty()


db.contrato.count(
{$or: [{estado: 'complete'}]}
)