const TopClient = require("node-taobao-topclient");
const app = require("express")();

app.use(require("express").json({ limit: "50mb" }));
app.use(require("express").urlencoded({ extended: false, limit: "50mb" }));
app.use(require("cors")());

const client = new TopClient({
  appkey: "your appkey",
  appsecret: "your appsecret",
  REST_URL: 'http://gw.api.taobao.com/router/rest'
});

app.get("taobao_product_get_one", async (req, res) => {
  try {
    const product_list = await client.execute('taobao.product.get', {
      'fields':'',
      'product_id':'',
      'cid':'',
      'props':''
    });

    if (product_list) return res.status(200).json({result : product_list});
    else throw 
  } catch (error) {}
});

app.get("taobao_product_get_all", async(req,res) => {
  try {
    const product_list = await client.execute('taobao.products.get', {
      'fields':'product_id,tsc,cat_name,name',
      'nick':'',
      'page_no':'',
      'page_size':''
    })
    if (product_list) return res.status(200).json({result : product_list});
    else throw 
  } catch (error) {
    
  }
});

require('http').createServer(app).listen(8081);