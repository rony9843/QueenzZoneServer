const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://organicUser:${process.env.DB_PASSWORD}@cluster0.tibcl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 9900;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("this is home page and it is queenz zone main server api");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  // user database
  const queenZoneUser = client.db("QueenZ-Zone").collection("User");
  // perform actions on the collection object
  // lets start

  // ~  console.log("mongodb connected");

  // new user gmail and other info post server
  // post mongoDB
  app.post("/queenZoneCreateUser", (req, res) => {
    // ~  console.log(req.body);
    const newData = req.body;
    // insert Database
    queenZoneUser.insertOne(newData).then(function (result) {
      // process result
      // ~  console.log(result);
      res.send(result);
    });
  });

  // read find user email and others info
  app.post("/queenZoneFindUser", function (req, res) {
    const newData = req.body.loggingUserInfo;

    // ~  console.log("heeeeeeeeeeeeeeeee : ", newData);

    queenZoneUser
      .find({ _id: ObjectId(newData) })
      .toArray(function (err, result) {
        // ~  console.log("this is find result 1", result);
        res.send(result);
      });
  });

  // read find One user email and others info
  app.post("/queenZoneFindOneUser", function (req, res) {
    const newBodyData = req.body.email;

    // ~  console.log("this is data : ", newBodyData);

    queenZoneUser.find({ email: newBodyData }).toArray(function (err, result) {
      // ~  console.log(result);
      res.send(result);
    });
  });

  // read find all ===> user email and others info
  app.get("/queenZoneFindAllUser", function (req, res) {
    const newData = req.body.loggingUserInfo;

    queenZoneUser.find().toArray(function (err, result) {
      // ~  console.log("this is find result 2", result);
      res.send(result);
    });
  });

  // check google pop user
  app.post("/queenZoneGooglePopUser", function (req, res) {
    const newData = req.body.localStroageuserInfo;
    // ~  console.log("this is find datattttttttttttttttt::::::::::  ", newData);

    queenZoneUser
      .find({ email: newData.email })
      .toArray(function (err, result) {
        // ~  console.log("this is find result 3", result);

        res.send(result);
      });

    //   this is check obj in mongodb
    // queenZoneUser
    //   .find({ "rony136ytu47@gmail.com": { $exists: true } })
    //   .toArray(function (err, result) {
    //     // ~  console.log("this is find exists ::::::   ", result);

    //     res.send(result);
    //   });
  });

  // check google pop user
  app.post("/queenZoneGooglePopUserFind", function (req, res) {
    const newData = req.body.props;
    // ~  console.log("this is find datattttttttttttttttt::::::::::  ", newData);

    queenZoneUser
      .find({ email: newData.email })
      .toArray(function (err, result) {
        // ~  console.log("this is find result 3", result);

        res.send(result);
      });

    //   this is check obj in mongodb
    // queenZoneUser
    //   .find({ "rony136ytu47@gmail.com": { $exists: true } })
    //   .toArray(function (err, result) {
    //     // ~  console.log("this is find exists ::::::   ", result);

    //     res.send(result);
    //   });
  });

  // update user info

  app.post("/queenZoneUserInfoUpdate", function (req, res) {
    const updateData = req.body.newData;
    // ~  console.log(updateData);

    queenZoneUser
      .updateOne(
        { email: updateData.email },
        {
          $set: {
            phoneNumber: updateData.phoneNumber,
            address: updateData.address,
            displayName: updateData.displayName,
          },
        }
      )
      .then(function (result) {
        // process result
        // ~  console.log(result);
        res.send(result);
      });
  });

  // ================== Product all things ========================

  // product databse

  const queenZoneProduct = client.db("QueenZ-Zone").collection("Product");
  // product post
  app.post("/queenZoneUserProductUpload", function (req, res) {
    const postData = req.body.productDetails;
    // ~  console.log("this is product upload ", postData);

    // insert Database
    queenZoneProduct.insertMany(postData).then(function (result) {
      // process result
      // ~  console.log(result);
      res.send(result);
    });
  });

  // fetch all product
  app.get("/queenZoneFindAllProduct", function (req, res) {
    const newData = req.body;

    queenZoneProduct.find().toArray(function (err, result) {
      //    // ~  console.log("this is find result 4", result);
      res.send(result);
    });
  });

  // delete product
  app.get("/queenZoneProductDelete/:PId", function (req, res) {
    const newData = req.params.PId;
    console.log("this is delete product : ", newData);
    // ~  console.log("this is edit order : ", newData);

    // queenZoneProduct
    //   .deleteOne({ _id: ObjectId(newData) })
    //   .toArray(function (err, result) {
    //     console.log("this is delete product : ", result);
    //     res.send(result);
    //   });

    queenZoneProduct
      .deleteOne({ _id: ObjectId(newData) })
      .then(function (result) {
        console.log("this is delete  : ", result);
        res.send(result);
      });

    // queenZoneProduct
    //   .deleteOne({ _id: ObjectId(newData) })
    //   .toArray(function (err, result) {
    //     // ~  console.log("this is delete product : ", result);
    //     res.send(result);
    //   });
  });

  // ========================== ORDER ===========================

  const queenZoneOrder = client.db("QueenZ-Zone").collection("Order");

  // post order
  app.post("/queenZoneUserPostOrder", function (req, res) {
    const postData = [req.body.Finaldata];
    // // ~  console.log("this is product upload ", postData);

    // insert Database
    queenZoneOrder.insertMany(postData).then(function (result) {
      // process result
      //  // ~  console.log(result);
      res.send(result);
    });
  });

  // all order read

  app.get("/queenZoneAllOrder", function (req, res) {
    queenZoneOrder.find().toArray(function (err, result) {
      //  // ~  console.log("this is find result 77", result);
      res.send(result);
    });
  });

  // order find

  app.get("/queenZoneOrderFind/:UEmail", function (req, res) {
    const newData = req.params.UEmail;
    // ~  console.log("this is order ->>>>", newData);

    queenZoneOrder.find({ UserEmail: newData }).toArray(function (err, result) {
      // ~  console.log("this is find result 5", result);
      res.send(result);
    });
  });

  // find order for one user

  app.get("/queenZoneOrderFindOneUser", function (req, res) {
    const newData = req.query.email;
    // ~  console.log("this is order ->>>>", newData);

    queenZoneOrder.find({ UserEmail: newData }).toArray(function (err, result) {
      // ~  console.log("this is find result 5", result);
      res.send(result);
    });
  });

  // order find in order number for edit

  app.get("/queenZoneEditOrderFind/:Onumber", function (req, res) {
    const newData = req.params.Onumber;
    // ~  console.log("this is edit order : ", newData);

    queenZoneOrder
      .find({ _id: ObjectId(newData) })
      .toArray(function (err, result) {
        // ~  console.log("this is edit order : ", result);
        res.send(result);
      });
  });

  // order delete

  app.get("/queenZoneOrderDelete/:Onumber", function (req, res) {
    const newData = req.params.Onumber;
    // ~  console.log("this is edit order : ", newData);

    queenZoneOrder
      .deleteOne({ _id: ObjectId(newData) })
      .toArray(function (err, result) {
        // ~  console.log("this is edit order : ", result);
        res.send(result);
      });
  });

  // change order status in dashboard

  app.post("/queenZoneEditedOrderStatus", (req, res) => {
    const OrderStatus = req.body;

    // insert Database

    queenZoneOrder
      .updateOne(
        { _id: ObjectId(OrderStatus.orderId) },
        {
          $set: {
            orderStatus: OrderStatus.orderStatus,
          },
        }
      )
      .then(function (result) {
        // process result
        // ~  console.log(result);
        res.send(result);
      });
  });

  // delete order  in dashboard

  app.post("/queenZoneDeleteOrder", (req, res) => {
    const OrderStatus = req.body;

    // insert Database

    queenZoneOrder
      .deleteOne({ _id: ObjectId(OrderStatus.orderId) })
      .then(function (result) {
        // process result
        // ~  console.log(result);
        res.send(result);
      });
  });

  // find single product for single product page
  app.get("/queenZoneSingleProduct/:PID", function (req, res) {
    const newData = req.params.PID;

    queenZoneProduct
      .find({ _id: ObjectId(newData) })
      .toArray(function (err, result) {
        // ~  console.log("this is find result 5", result);
        res.send(result);
      });
  });

  ///  =================== category ===================
  const queenZoneCategory = client.db("QueenZ-Zone").collection("Category");

  //read category
  app.get("/queenZoneCategoryRead", function (req, res) {
    const newData = req.body;

    //  // ~  console.log(newData);

    queenZoneCategory.find().toArray(function (err, result) {
      // // ~  console.log("this is find result 6", result);
      res.send(result);
    });
  });

  // post category

  app.post("/queenZoneCategoryPost", (req, res) => {
    // // ~  console.log(req.body);
    const postCa = req.body.postCategory;

    // insert Database

    const rendomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;

    queenZoneCategory
      .insertOne({ postCa, _id: rendomNumber })
      .then(function (result) {
        // process result
        // ~  console.log(result);
        res.send(result);
      });
  });

  /// delete category
  app.post("/queenZoneCategoryDelete", (req, res) => {
    // ~  console.log(req.body);
    const postCa = req.body;

    // insert Database

    const rendomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;

    queenZoneCategory
      .deleteOne({ postCa: postCa.props.postCa })
      .then(function (result) {
        // process result
        // ~  console.log(result);
        res.send(result);
      });
  });

  ///  =================== category Layout ===================

  const queenZoneCategoryLayout = client
    .db("QueenZ-Zone")
    .collection("CategoryLayout");

  // submit Category layout
  app.post("/queenZoneCategoryLayout", (req, res) => {
    const postCa = req.body;
    // ~  console.log(postCa.SubPro.layout);
    // insert Database

    queenZoneCategoryLayout
      .updateOne(
        { _id: ObjectId("6261aa903e70c1e588a8e750") },
        { $set: { layout: postCa.SubPro.layout } }
      )
      .then(function (result) {
        // process result
        // ~  console.log(result);
        res.send(result);
      });
  });

  // get category layout

  app.get("/queenZoneCategoryLayoutRead", function (req, res) {
    const newData = req.body;

    // ~  console.log(newData);

    queenZoneCategoryLayout.find().toArray(function (err, result) {
      // ~  console.log("this is find result 6", result);
      res.send(result);
    });
  });

  ///  =================== Views Layout ===================

  const queenZoneVisitorInfo = client
    .db("QueenZ-Zone")
    .collection("ClientVisitorInfo");

  // visitor info post layout
  app.post("/visitorInfo", (req, res) => {
    const vInfo = req.body;
    // ~  console.log("this is visitor indo : ", vInfo);

    // insert Database

    queenZoneVisitorInfo.insertOne({ vInfo }).then(function (result) {
      // process result
      // ~  console.log(result);
      res.send(result);
    });
  });

  // get visitor info data
  app.get("/getVisitorInfo", function (req, res) {
    queenZoneVisitorInfo
      .find()
      .sort({ _id: -1 })
      .limit(40)
      .toArray(function (err, result) {
        res.send(result.reverse());
      });
  });

  /// delete all
  app.get("/deleteAllVisitorInfo", function (req, res) {
    queenZoneVisitorInfo.remove();
  });

  // ===================== edit product =======================
  // submit edited product
  app.post("/queenZoneEditedProduct", (req, res) => {
    const editedProduct = req.body;
    // ~  console.log(editedProduct);
    // insert Database

    queenZoneProduct
      .updateOne(
        { _id: ObjectId(editedProduct.allEditList.product_id) },
        {
          $set: {
            ProductDescription: editedProduct.allEditList.product_des,
            ProductPrice: editedProduct.allEditList.Product_price,
            isSizeShow: editedProduct.allEditList.isSizeShow,
            productSize: editedProduct.allEditList.product_size,
            ProductName: editedProduct.allEditList.Product_name,
            ProductOffer: editedProduct.allEditList.product_offer,
            ProductCategory: editedProduct.allEditList.product_cate,
            ProductTags: editedProduct.allEditList.product_tag,
          },
        }
      )
      .then(function (result) {
        // process result
        // ~  console.log(result);
        res.send(result);
      });
  });

  // =============================== Inbox ==============================

  const queenZoneInbox = client.db("QueenZ-Zone").collection("InboxRoom");

  app.post("/queenZoneCreateInbox", (req, res) => {
    const createInbox = req.body;
    // ~  console.log(createInbox.props.onlineUser.activeUserInfo);

    if (createInbox.props.onlineUser.activeUserInfo === "old") {
      // ~  console.log("this is old vlog");
      queenZoneInbox
        // filter
        .find({ room: createInbox.props.onlineUser.oldUserInfo.email })
        .toArray(function (err, result) {
          // ~  console.log(!result.length);

          // if not found
          !result.length === true &&
            queenZoneInbox
              .insertOne({
                room: createInbox.props.onlineUser.oldUserInfo.email,
                time: new Date(),
              })
              .then(function (result) {
                // process result
                // ~  console.log(result);
                res.send(result);
              });
        });
    } else {
      queenZoneInbox
        // filter
        .find({ room: createInbox.props.onlineUser.activeUserNumber })
        .toArray(function (err, result) {
          // ~  console.log(!result.length);

          // if not found
          !result.length === true &&
            queenZoneInbox
              .insertOne({
                room: createInbox.props.onlineUser.activeUserNumber,
                time: new Date(),
              })
              .then(function (result) {
                // process result
                // ~  console.log(result);
                res.send(result);
              });
        });
    }
  });

  // get inbox left side
  app.get("/getInboxLeftSideInfo", function (req, res) {
    queenZoneInbox.find().toArray(function (err, result) {
      res.send(result);
    });
  });

  // get a room
  app.get("/getInboxRoom", function (req, res) {
    const roomName = req.query.roomName;
    // ~  console.log("this is room 11----------------> ", roomName);
    queenZoneInbox.find({ room: roomName }).toArray(function (err, result) {
      // ~  console.log("this is room----------------> ", result);
      res.send(!result.length === true ? false : true);
    });
  });

  // get a room
  app.get("/createAnInboxRoom", function (req, res) {
    const roomName = req.query.roomName;

    // ~  console.log("this is room name 2---------------->  ", roomName);
    queenZoneInbox
      .insertOne({ room: roomName, time: new Date() })
      .then(function (result) {
        // process result
        // ~  console.log(result);
        res.send(result);
      });
  });

  // ================= Inbox Message =======================
  const queenZoneInboxMessage = client
    .db("QueenZ-Zone")
    .collection("InboxMessage");

  // post inbox Message
  app.post("/queenZoneInboxSendMessage", (req, res) => {
    const message = req.body;
    // ~  console.log(message);

    // insert Database
    queenZoneInboxMessage.insertOne({ message }).then(function (result) {
      // process result
      // ~  console.log(result);
      res.send(result);
    });
  });

  // get inbox message
  app.get("/getInboxMessage", function (req, res) {
    const roomName = req.query.roomName;

    // ~  console.log(roomName);

    //   queenZoneInboxMessage.find().toArray(function (err, result) {
    //     const data = result.filter((dt) => dt.message.room == roomName);
    //     // ~  console.log(data);
    //     res.send(data);
    //   });
    // });

    // { qty: { $gt: 4 } } )
    queenZoneInboxMessage
      .find({ "message.room": roomName })
      .sort({ _id: -1 })
      .limit(20)
      .toArray(function (err, result) {
        const data = result.filter((dt) => dt.message.room == roomName);
        // // ~  console.log(result);
        res.send(result.reverse());
      });
  });

  // get inbox One Message
  app.get("/getInboxOneMessage", function (req, res) {
    const roomName = req.query.roomName;

    // ~  console.log(roomName);

    //   queenZoneInboxMessage.find().toArray(function (err, result) {
    //     const data = result.filter((dt) => dt.message.room == roomName);
    //     // ~  console.log(data);
    //     res.send(data);
    //   });
    // });

    // { qty: { $gt: 4 } } )
    queenZoneInboxMessage
      .find({ "message.room": roomName })
      .sort({ _id: -1 })
      .limit(1)
      .toArray(function (err, result) {
        const data = result.filter((dt) => dt.message.room == roomName);
        // // ~  console.log(result);
        res.send(result.reverse());
      });
  });

  // get inbox leftSide message
  app.get("/getInboxOneMessage", function (req, res) {
    const roomName = req.query.roomName;

    // ~  console.log(roomName);

    //   queenZoneInboxMessage.find().toArray(function (err, result) {
    //     const data = result.filter((dt) => dt.message.room == roomName);
    //     // ~  console.log(data);
    //     res.send(data);
    //   });
    // });

    // { qty: { $gt: 4 } } )
    queenZoneInboxMessage
      .find({ "message.room": roomName })
      .sort({ _id: -1 })
      .limit(20)
      .toArray(function (err, result) {
        const data = result.filter((dt) => dt.message.room == roomName);
        // // ~  console.log(result);
        res.send(result.reverse());
      });
  });

  /// delete all message
  app.get("/deleteAllInboxMessage", function (req, res) {
    queenZoneInboxMessage.remove();
  });

  // seen update user to admin inbox message // user message seen update
  app.get("/seenUpdateInboxMessage", function (req, res) {
    const roomName = req.query.roomName;

    // ~  console.log(roomName);

    queenZoneInboxMessage
      .updateMany(
        { "message.room": roomName },
        {
          $set: {
            "message.userSeen": "seen",
          },
        }
      )

      .then(function (result) {
        // process result
        // ~  console.log("this is seen update", result);
        res.send(result);
      });
  });

  // seen update admin to user inbox message // admin message seen update
  app.get("/adminSeenUpdateInboxMessage", function (req, res) {
    const roomName = req.query.roomName;

    // ~  console.log(roomName);

    queenZoneInboxMessage
      .updateMany(
        { "message.room": roomName },
        {
          $set: {
            "message.adminSeen": "seen",
          },
        }
      )

      .then(function (result) {
        // process result
        // ~  console.log("this is seen update", result);
        res.send(result);
      });
  });

  // ============== edit message
  app.post("/queenZoneInboxEditMessage", (req, res) => {
    const editMessage = req.body;
    // ~  console.log(editMessage);
    // insert Database

    queenZoneInboxMessage
      .updateOne(
        { _id: ObjectId(editMessage.id) },
        {
          $set: {
            "message.message": editMessage.newMessage,
          },
        }
      )

      .then(function (result) {
        // process result
        // ~  console.log(result);
        res.send(result);
      });
  });

  app.post("/queenZoneInboxEditDeleteMessage", (req, res) => {
    const editMessage = req.body;
    // ~  console.log(editMessage);
    // insert Database

    queenZoneInboxMessage
      .deleteOne({ _id: ObjectId(editMessage.id) })

      .then(function (result) {
        // process result
        // ~  console.log(result);
        res.send(result);
      });
  });

  // ======================================== Notes for user account =============================
  const queenZoneInboxNotes = client.db("QueenZ-Zone").collection("InboxNotes");

  // save notes
  app.post("/queenZoneInboxNotes", (req, res) => {
    const Notes = req.body;
    // ~  console.log(Notes);
    // insert Database

    queenZoneInboxNotes
      .updateOne({ room: Notes.room }, { $set: { notes: Notes.notes } })

      .then(function (result) {
        // process result
        // ~  console.log(result);
        res.send(Notes);
      });
  });

  // find notes
  app.get("/queenZoneInboxNotesFind", function (req, res) {
    const roomName = req.query.roomName;

    // ~  console.log(roomName);

    // check

    queenZoneInboxNotes
      .find({ room: roomName })
      .toArray(function (err, result) {
        if (!result.length) {
          // not exist
          queenZoneInboxNotes
            .insertOne({ room: roomName, notes: "" })
            .then(function (result) {
              // process result
              // ~  console.log(result);
              res.send(result);
            });
        } else {
          // exist
          res.send(result);
        }
      });
  });

  // ======================================== rating =============================
  const queenZoneRating = client.db("QueenZ-Zone").collection("Rating");

  // post rating
  app.post("/queenZoneUserRating", (req, res) => {
    const rating = req.body;

    // insert Database

    // insert Database
    queenZoneRating.insertOne({ rating }).then(function (result) {
      // process result
      // ~  console.log(result);
      res.send(result);
    });
  });

  // find rating email and productKey
  app.get("/queenZoneUserRatingFind", function (req, res) {
    const email = req.query.email;
    const productKey = req.query.productKey;
    const orderNumber = req.query.orderKey;

    // ~  console.log("this is rating find : ", email, productKey);

    queenZoneRating
      .find({
        "rating.email": email,
        "rating.productId": productKey,
        "rating.orderNumber": orderNumber,
      })
      .toArray(function (err, result) {
        res.send(result);
        // ~  console.log(result);
      });
  });

  // all rating
  app.get("/queenZoneUserFindAllRating", function (req, res) {
    queenZoneRating.find().toArray(function (err, result) {
      res.send(result);
    });
  });

  // find one product include all rating
  app.get("/queenZoneUserRatingFindOneProduct", function (req, res) {
    const productKey = req.query.productKey;

    queenZoneRating
      .find({
        "rating.productId": productKey,
      })
      .toArray(function (err, result) {
        res.send(result);
        // ~  console.log(result);
      });
  });

  /// ============================= resource ========================================

  const queenZoneResource = client.db("QueenZ-Zone").collection("Resource");

  // post rating
  app.post("/queenZoneUserUploadResource", (req, res) => {
    const resource = req.body;

    console.log("this is Resource ", resource);

    // insert Database
    queenZoneResource.insertOne({ resource }).then(function (result) {
      // process result
      // ~  console.log(result);
      res.send(result);
    });
  });

  // all Resource
  app.get("/queenZoneAllResource", function (req, res) {
    queenZoneResource.find().toArray(function (err, result) {
      res.send(result);
    });
  });

  /// delete resource one
  app.post("/queenZoneDeleteResource", (req, res) => {
    const resourceId = req.body.id;

    queenZoneResource
      .deleteOne({ _id: ObjectId(resourceId) })

      .then(function (result) {
        res.send(result);
      });
  });

  /// ============================= carousel ========================================
  const queenZoneComponentsLayout = client
    .db("QueenZ-Zone")
    .collection("Carousel");

  // post rating
  app.post("/queenZoneComponentsLayout", (req, res) => {
    const componentsSection = req.body.componentsSection;

    console.log("this is Resource ", componentsSection);

    // insert Database
    queenZoneComponentsLayout
      .insertOne({ componentsSection })
      .then(function (result) {
        // process result
        // ~  console.log(result);
        res.send(result);
      });
  });

  // all components section
  app.get("/queenZoneReadComponentsSection", function (req, res) {
    queenZoneComponentsLayout.find().toArray(function (err, result) {
      res.send(result);
    });
  });

  /// delete components section one
  app.post("/queenZoneDeleteComponentsSection", (req, res) => {
    const componentsLayoutId = req.body.id;

    queenZoneComponentsLayout
      .deleteOne({ _id: ObjectId(componentsLayoutId) })

      .then(function (result) {
        res.send(result);
      });
  });

  // update components
  app.post("/queenZoneUpdateComponentsSection", function (req, res) {
    const componentsSection = req.body;
    console.log(componentsSection);

    queenZoneComponentsLayout
      .updateOne(
        { _id: ObjectId(componentsSection.id) },
        {
          $set: {
            "componentsSection.Name": componentsSection.componentsSection.Name,
            "componentsSection.mt": componentsSection.componentsSection.mt,
            "componentsSection.mb": componentsSection.componentsSection.mb,

            "componentsSection.Interval":
              componentsSection.componentsSection.Interval,
            "componentsSection.link": componentsSection.componentsSection.link,
          },
        }
      )
      .then(function (result) {
        // process result
        console.log(result);
        res.send(result);
      });
  });

  /// ============================= Product's poster ========================================
  const queenZoneComponentsProductsPoster = client
    .db("QueenZ-Zone")
    .collection("ProductsPoster");

  // post rating
  app.post("/queenZoneProductsPoster", (req, res) => {
    const componentsSection = req.body.componentsSection;

    // insert Database
    queenZoneComponentsProductsPoster
      .insertOne({ componentsSection })
      .then(function (result) {
        // process result
        // ~  console.log(result);
        res.send(result);
      });
  });

  // read all productPoster
  app.get("/queenZoneReadProductPoster", function (req, res) {
    queenZoneComponentsProductsPoster.find().toArray(function (err, result) {
      res.send(result);
    });
  });

  /// delete components section one
  app.post("/queenZoneDeleteProductsPoster", (req, res) => {
    const componentsLayoutId = req.body.id;

    queenZoneComponentsProductsPoster
      .deleteOne({ _id: ObjectId(componentsLayoutId) })

      .then(function (result) {
        res.send(result);
      });
  });

  // update product poster
  app.post("/queenZoneUpdateProductPoster", function (req, res) {
    const componentsSection = req.body;
    console.log(componentsSection);

    queenZoneComponentsProductsPoster
      .updateOne(
        { _id: ObjectId(componentsSection.id) },
        {
          $set: {
            "componentsSection.Name": componentsSection.componentsSection.Name,
            "componentsSection.type": "ProductsPoster",
            "componentsSection.id": componentsSection.componentsSection.id,

            "componentsSection.link": componentsSection.componentsSection.link,
            "componentsSection.boxBg":
              componentsSection.componentsSection.boxBg,
            "componentsSection.boxBorderRadios":
              componentsSection.componentsSection.boxBorderRadios,
            "componentsSection.boxMt":
              componentsSection.componentsSection.boxMt,
            "componentsSection.boxMb":
              componentsSection.componentsSection.boxMb,
            "componentsSection.boxPt":
              componentsSection.componentsSection.boxPt,
            "componentsSection.boxPb":
              componentsSection.componentsSection.boxPb,
            "componentsSection.title":
              componentsSection.componentsSection.title,
            "componentsSection.titleClr":
              componentsSection.componentsSection.titleClr,
            "componentsSection.titleP":
              componentsSection.componentsSection.titleP,
            "componentsSection.titlePt":
              componentsSection.componentsSection.titlePt,
            "componentsSection.titlePb":
              componentsSection.componentsSection.titlePb,
            "componentsSection.titlePx":
              componentsSection.componentsSection.titlePx,
            "componentsSection.titleAlign":
              componentsSection.componentsSection.titleAlign,
            "componentsSection.titleAndImageTarget":
              componentsSection.componentsSection.titleAndImageTarget,
            "componentsSection.titleImageMobileLink":
              componentsSection.componentsSection.titleImageMobileLink,
            "componentsSection.titleImageDesktopLink":
              componentsSection.componentsSection.titleImageDesktopLink,
            "componentsSection.titleImageM":
              componentsSection.componentsSection.titleImageM,
            "componentsSection.titleImageMt":
              componentsSection.componentsSection.titleImageMt,
            "componentsSection.titleImageMb":
              componentsSection.componentsSection.titleImageMb,
            "componentsSection.titleImageMx":
              componentsSection.componentsSection.titleImageMx,
          },
        }
      )
      .then(function (result) {
        // process result
        console.log(result);
        res.send(result);
      });
  });

  // ===================== static poster =======================

  const queenZoneComponentsStaticPoster = client
    .db("QueenZ-Zone")
    .collection("StaticPoster");

  // post rating
  app.post("/queenZoneStaticPoster", (req, res) => {
    const componentsSection = req.body.componentsSection;

    // insert Database
    queenZoneComponentsStaticPoster
      .insertOne({ componentsSection })
      .then(function (result) {
        // process result
        // ~  console.log(result);
        res.send(result);
      });
  });

  // read all static poster
  app.get("/queenZoneReadStaticPoster", function (req, res) {
    queenZoneComponentsStaticPoster.find().toArray(function (err, result) {
      res.send(result);
    });
  });

  /// delete product static banner
  app.post("/queenZoneDeleteStaticBanner", (req, res) => {
    const componentsLayoutId = req.body.id;

    queenZoneComponentsStaticPoster
      .deleteOne({ _id: ObjectId(componentsLayoutId) })

      .then(function (result) {
        res.send(result);
      });
  });

  // end
});

app.listen(PORT, function () {
  console.log(`Example app listening at ${PORT}`);
});
