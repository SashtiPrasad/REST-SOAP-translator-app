const translate = require('translate-google')
const soap = require('soap');
const express = require('express');
const fs = require('fs');


let TranslateConfig = {
    from: 'en',
    to: 'fr'
}

const translateString =   (args) => {
    translate(args.word,TranslateConfig).then(result => {
        console.log(args.word + " : " + result)
    }).catch(err => {
        console.log(err)
    })
    return "Translated"
}


var serviceObject = {
    MessageSplitterService: {
        MessageSplitterServiceSoapPort: {
            MessageSplitter: translateString
        },
        MessageSplitterServiceSoap12Port: {
            MessageSplitter: translateString
        }
    }
};


var xml = fs.readFileSync('service.wsdl', 'utf8');

var app = express();


var port = 8000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);

  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});