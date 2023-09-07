const express = require("express")
const router = express.Router()
const models = require("./models")

router.get("/characters", async (req, res) => {
  try {
    const characters = await models.Character.aggregate([
      // aggregate process and transform data in MongoDB collections.
      // Used to perform various operations on date such as filtering, grouping, sorting, and performing calculations, to obtain aggregated results
      {
        $lookup: {
          // lookup is used to match two documents , it works on four parameters
          // 1.from : document name
          // 2.localFiels : field name from first table
          // 3.foreignField: filed name from document defined name
          // 4.as : renameing the fiedl name
          from: "deaths",
          localField: "name",
          foreignField: "death",
          as: "deathInfo"
        }
      },
      {
        $lookup: {
          from: "quotes",
          localField: "name",
          foreignField: "author",
          as: "quoteInfo"
        }
      },
      {
        $project: {
          char_id: "$_id",
          img: 1,
          name: 1,
          status: {
            $cond: {
              if: { $eq: [{ $size: "$deathInfo" }, 0] }, // if size to deathInfo is 0 then set status to alive else set to dead
              then: "Alive",
              else: "Dead"
            }
          },
          portrayed: 1,
          birth_day: "$birth_date",
          occupation: 1,
          appearances: 1,
          death: {
            $cond: {
              // cond is used to write any condition
              if: { $eq: [{ $size: "$deathInfo" }, 0] }, // if size to deathInfo is 0 then set status to alive else set to dead
              then: null,
              else: {
                cause: { $arrayElemAt: ["$deathInfo.cause", 0] },
                season: { $arrayElemAt: ["$deathInfo.season", 0] },
                episode: { $arrayElemAt: ["$deathInfo.episode", 0] }
              }
            }
          },
          quotes: {
            $map: {
              input: "$quoteInfo",
              as: "quote",
              in: "$$quote.quote"
            }
          }
        }
      },
      {
        $project: {
          _id: 0 // Exclude '_id' field
        }
      }
    ])

    res.json(characters)
  } catch (error) {
    res.status(500).json({ error: "Error fetching characters" })
  }
})

module.exports = router

{
  /*

** Aggregation Pipeline **
1. Match **

  >> db.sales.aggregate([
     { $match: { status: "completed", totalAmount: { $gte: 1000 } } }
     ]);
----------------------------------------------------     
2. project **
  >> db.sales.aggregate([
     {
     $project: {
       _id: 0,
       customer: "$customer.name",
       orderDate: "$orderDate",
       totalAmount: 1
     }
     }
     ]);
     
  ----------------------------------------------------  
  3. group **
     Used for Sum, Avg, Min, Max
  >> db.sales.aggregate([
      {
        $group: {
          _id: "$product",
          totalSales: { $sum: "$quantity" },
          avgPrice: { $avg: "$price" }
        }
      }
    ]);
  ----------------------------------------------------  
  4. sort **
  
  >> db.sales.aggregate([
      { $sort: { totalAmount: -1 } }
     ]);
*/
}
