// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import * as React from "react";
import {useState,useEffect} from "react";
import { useNavigate,useParams } from 'react-router-dom'
import Steps from './Steps';
//import { useMoralis, useMoralisFile} from "react-moralis";

//import InputField from './InputField';

const config = {
                    server : "localhost:5000"
                }

const addressBook = {
                    "0x0000000000000000000000000000000000000000":"Created",    
                    "0x33b71BF1625C178AEb8cC1E10797a381e8AB341a":"Alok Sethi", 
                    "0xfc8094594b07BF0120613Abb388eC0276DBd3Fd0":"Demo Buyer ", 
                    "0x29c9B181fF565D3F0715FAa7E9A5863a469391Cb":"Ishan Roy",
                    "0x20263d77C79efaCE77F8fAB3D5649b444d2c349F":"Surabhi ",
                    "0x2AA2595Dfa4Ae4DbA3CEBbB290218C14F6799889":"Alisha Chenab ",
                    "0xda73289986b44e74177c9D8b9559660C13e8f891":"MA Chowdhury",
                    "0x6Ea4ab28E6442A89aB5880bd98c713f6B8E6EA9a":"Art Inc."
                    };                


function BuyNftForm_(props,ref) {

const [price, setprice] = useState({ });

const [saleData, setsaleData] = useState({ })

const [historyData, sethistoryData] = useState({history:[]})

let count = 0;





console.log("props",props);

const token = props.token.token;

console.log(token.expiryTime, token.listingTime, token,"token dates")



var tmp = new Date( token.timestamp);

var timestamp = tmp.toLocaleDateString();



let urlIPFS = 'http://127.0.0.1:8080/ipfs/'+ token.ipfsHash;

useEffect(() => {

    
    let url = 'http://'+config.server+'/getProvenance';

    
    let params = JSON.stringify({              
        tokenId: token.tokenId,
        nftContract : token.nftContract
                });
       
    console.log("url",url);	
    
    if (count == 0 )
    {
        count  = 1;
  
        fetch(url, {

    method: 'POST',
    mode: 'cors',

    headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json',
          },	
    body: params	
                
            }).then(function(response,error) {
    

                if(response)
            {
                
                return response.json();
            }
        else 
            {
                console.log(error);
            }
            }).then(function(data){

                console.log("provenance data",data);

                sethistoryData(prevState => {

                    return {
                        history: data.events.reverse()
                          }
                    })
                    
    
        })
    }   

},[count])

const buyNFT = () => {

    let app = this;
    let url = 'http://'+config.server+'/buyNFT';
    
       
  let params = JSON.stringify({              
    tokenId: token.tokenId,
    price: token.listprice
            });

    console.log(params,"params");	

  fetch(url, {

    method: 'POST',
    mode: 'cors',

    headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json',
          },	
    body: params
                
            }).then(function(response,error) {
    

                if(response)
            {
                
                return response.json();
            }
        else 
            {
                console.log(error);
            }
            }).then(function(data){

                console.log("data",data);


                setsaleData(prevState => {
    
                    return {
                        ...prevState,
                        seller: data.seller,
                        buyer: data.buyer,
                        price: data.price,
                        signature: data.signature,
                        blocknumber: data.blocknumber,
                        tokenId: data.tokenId,
                        txhash: data.txhash,
                        nftContract: data.nftContract,

                          }
                        
                    })  
    
        })   

    }


    
      
        	
return(
            <div>           
                            <div className="columns">                               
                            <div className="column">
                            </div>
                            </div>
                            <div className="columns">                               
                            <div className="column">
                            </div>
                            </div>
                            <div className="columns">  
                            { saleData.txhash?
                            <div className="column has-text-centered">
                            <h3 className="title is-2 is-family-secondary"> NFT Bought Successfully</h3>
                            </div>:
                            <div className="column has-text-centered"> 
                            <h3 className="title is-2 is-family-secondary"> Buy NFT</h3>
                            </div>
                            }
                            </div>
                            <div className="columns">                               
                            <div className="column">   
                            <Steps bar={"buy"}/>
                            </div>
                            </div>
                            
                            

                            

                            <div className="columns is-flex is-centered">    
                            
                                
                                <div className = "column is-4">

                                <form className="box">
                                <figure className="image is-square">
                                <img src={urlIPFS}/>
                                </figure>
                                </form>

                                </div>
                                


                                <div className = "column is-5 ">
                                
                                <nav className="panel">
                                <br></br>
  
                                {
                                saleData.txhash?    
                                <div>
                                    <form className="box">
                                     
                                           <div className="is-family-secondary has-text-centered">


                                               <b>Transaction hash</b> :<br></br>  
                                               <span className="tag is-success is-large is-light is-multiline">{saleData.txhash}</span><br></br><br></br>                         
                                               
                                               <b>Signature</b> :<br></br>
                                               <span className="tag is-success is-large is-light">{saleData.signature}</span><br></br><br></br>
                                               
                                               <b>Block Number</b> :<br></br>
                                               <span className="tag is-large is-success is-light">{saleData.blocknumber}</span><br></br><br></br>
                                               
                                               <b>Buyer</b> :<br></br>  
                                               <span className="tag is-large is-success is-light is-multiline">{saleData.buyer}</span><br></br><br></br>   

                                               <b>Seller</b> :<br></br>  
                                               <span className="tag is-large is-success is-light is-multiline">{saleData.seller}</span><br></br><br></br>                         
                                               
                                               <b>Price</b> :<br></br>
                                               <span className="tag is-large is-success is-light">{saleData.price}</span><br></br><br></br>
                                               
                                               <b>Token ID</b> :<br></br>
                                               <span className="tag is-large is-success is-light">{saleData.tokenId}</span><br></br><br></br>
                                               
                                               <b>NFT Contract</b> :<br></br>
                                               <span className="tag is-large is-success is-light">{saleData.nftContract}</span><br></br><br></br>
                                               
                                             </div> 

                                 </form>                                
                                </div>:
                                
                                <div className="column is-8 is-offset-2">

                                <div className="card is-rounded">
                                    

                                <div className="card-content">
                
                                <div className="media">

                                <div class="media-left">
                                <figure class="image is-48x48">
                                <img className ="is-rounded" src="passport.jpg" alt="Placeholder image"/>
                                </figure>
                                </div>    


                                <div className="media-content">

                                <h2 class="title is-4">{token.name}</h2>

                                <h2 class="subtitle is-6">{token.creatorname}</h2>

                                </div>

                                <div class="media-right">
                                <span className="tag is-success is-large">₹{token.listprice} </span><br></br><br></br>    
                                </div>    
                                
                                
                                </div>

                                
                                {token.description} <br></br><br></br>
                                <div className="content">

                                     
                               <b>Media type :</b>&nbsp;&nbsp;{token.media} <br></br>
                               <b>Category :</b>&nbsp;&nbsp;{token.category} <br></br>
                               <b>Included Items :</b>&nbsp;&nbsp;{token.bundle} <br></br>
                               <b>Created On:</b>&nbsp;&nbsp; {timestamp} <br></br><br></br>

                               <b>Listed Date  :</b>&nbsp;&nbsp; {token.listingTimeISO} <br></br>
                               <b>Expiry Date  :</b>&nbsp;&nbsp; {token.expiryTimeISO} <br></br>

                                
                                </div>

                                
                                
                               
                                </div>
                                </div>

                                
                                     
                                                            
                                <div className="column is-offset-4">
                                <br></br>   
                                {
                                saleData.txhash?    
                                <div></div>:
                                <a className="button is-black" onClick={ () => {buyNFT()}}>
                                Buy NFT</a>
                                }
                                </div>

                                </div>    
                                }
                            
                                </nav>
                                </div>
                                



                            </div><br></br><br></br>

                            <div className="columns is-flex has-text-centered">    
                            
                            <div className="column ">
                            <h1 className="title is-4">Provenance</h1>     
                            
                            <div className="column is-offset-2">
                            <form className="box has-text-centered">
                            <table className="table is-bordered is-striped is-hoverable">
                            
                <thead>
                Provenance    
                <tr>
                <th>SNo.</th>
                <th>From</th>
                <th>To</th>
                <th>Transaction ID</th>
                <th>Block Number</th>
                <th>Timestamp</th>             
               </tr>
               </thead>
                
                {
                        historyData.history.map((tx,index) => {
                            
                            let txHash = tx.transactionHash.slice(10);
                            
                            let receiver; 
                            if(addressBook[tx.returnValues.to])
                            receiver = addressBook[tx.returnValues.to];
                            else
                            receiver = tx.returnValues.to.slice(40) + "...";

                            let sender; 
                            if(addressBook[tx.returnValues.from])
                            sender = addressBook[tx.returnValues.from];
                            else
                            sender = tx.returnValues.from.slice(40) + "...";


                            
                            
							return (
                            <tbody key={index+1}>
                            <tr>
                            <th>{index+1}</th>    
                            <td>{sender}</td>
                            <td>{receiver}</td>
                            <td>{tx.transactionHash.slice(20)}...</td>
                            <td>{tx.blockNumber}</td>
                            <td>{tx.timestamp}</td>
                            </tr>
                            </tbody>
                              
                            )
                            })
                }
                
                </table>
                                 </form>
                            </div>
                            </div>
                            </div>
                            </div>           
            
)


}

const BuyNftForm = React.forwardRef(BuyNftForm_);

export default BuyNftForm;

//<img src='loading-small.gif'/>