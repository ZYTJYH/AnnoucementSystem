import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = {  web3: null, accounts: null, contract: null };

  constructor(props){
    super(props);

    this.state={
      title: "",
      subject: "",
      content: "",
      imageHash:""
    }
  }
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance,currentAccount: accounts[0] }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  inputTitle(e){
    this.setState({
      title: e.target.value
    })
  }
  inputSubject(e){
    this.setState({
      subject: e.target.value
    })
  }
  inputContent(e){
    this.setState({
      content: e.target.value
    })
  }
  //获取区块链信息
  async getAll(){
    try{
      let res=await this.state.contract.methods
      .getAll()
      .call({
        from: this.state.currentAccount
      });
      console.log(res)
    }catch(error){
      console.log(error);
    }
  }
  //向区块链写入过程
  async setAnnouncement(){
    if(this.state.title==""||this.state.subject==""||this.state.content=="")
    {
      alert("不能为空")
        return 
    }
    const that=this;

    let timestamp=new Date().getTime();

    try{
      console.log(this.state.currentAccount)
      let res=await this.state.contract.methods
          .setAnnouncement(this.state.title,this.state.subject,this.state.content,this.state.imageHash,String(timestamp))
          .send({
            from: this.state.currentAccount
          });
          console.log(res)
    }catch(error){
      console.log(error);
    }
  }
  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <input
          placeholder="公示标题"
          onChange={e=>this.inputTitle(e)}
          type="text"
          value={this.state.title}
        />
            <input
             type="text"
          onChange={e=>this.inputSubject(e)}
          placeholder="公示发起主体"
          value={this.state.subject}
        />
            <input
             type="text"
          onChange={e=>this.inputContent(e)}
          placeholder="告示内容"
          value={this.state.content}
        />
        <button onClick={()=>this.setAnnouncement()}>写入</button>
        <button onClick={()=>this.getAll()}>getAll()</button>
      </div>
    );
  }
}

export default App;
