<template>
    <div class="page-container">
        <div class="container">
          <div class="row">
            <div class="col-12 col-lg-4 mt-5 p-0">
              <form class="p-5">
                <h3 class="text-center">{{ underEdit ? "Edit" : "Add" }} Transaction</h3>
                <br />
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="amount">Amount</label>
                    <input type="number" class="form-control" id="amount" v-model.trim="amount" min="1">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" v-model.trim="description"></textarea>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="type">Type</label>
                    <select id="type" class="form-control" v-model="type">
                      <option>Credit</option>
                      <option>Debit</option>
                    </select>
                  </div>
                </div>
                <br />
                <div class="form-group row">
                  <div class="col-sm-12">
                    <button v-if="!underEdit" type="button" class="btn bg-custom-primary shadow text-white px-5 float-left" @click="addTransaction">Add</button>
                    <button v-if="underEdit" type="button" class="btn bg-custom-primary shadow text-white px-5 float-left" @click="editTransaction">Update</button>
                  </div>
                </div>
                <div class="alert text-center" role="alert" :class="message.success ? 'alert-success' : 'alert-danger'" v-if="message.text!=''">
                  {{message.text}}
                </div>
              </form>

            </div>
            <div class="col-12 col-lg-7 mt-5 p-0 offset-md-1">
              <div class="row mb-3">
                  <div class="col-md-4 offset-md-5">
                    <input type="date" class="form-control" id="search" v-model="search" placeholder="Search By Date" >
                  </div>
                  <div class="col-md-3">
                    <button type="button" class="btn btn-light mr-2" @click="filterDate">Search</button>
                  </div>
              </div>
              <table class="table table-bordered table-dark">
                <thead>
                    <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Description</th>
                    <th scope="col">Type</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(transaction,index) in transactions" :key="index" :class="transaction.type=='Debit' ? 'bg-success' : 'bg-danger' " v-if="txnsLength>0">
                      <th scope="row">{{index+1}} </th>
                      <td>{{name}}</td>
                      <td>{{transaction.amount.toFixed(2)}}</td>
                      <td>{{transaction.description}}</td>
                      <td>{{transaction.type}}</td>
                      <td>
                          <button type="button" class="btn btn-light mr-2" @click="enableEdit(index)">Edit</button>
                          <button type="button" class="btn btn-light" @click="deleteTransaction(index)">Delete</button>
                      </td>
                    </tr>
                    <tr class="bg-dark" v-else>
                      <th scope="row" colspan="6" class="text-center">No Record Found</th>
                    </tr>
                </tbody>
            </table>
            </div>  
          </div>
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Transaction',
  data(){
    return {
        name:this.$store.getters.currentUser.name,
        search:new Date().toISOString().slice(0,10),
        txnindex:0,
        transactions:[],
        amount:'',
        description:'',
        type:'Credit',
        underEdit:false,
        txnid:'',
        message:{
          success:true,
          text:''
        },
    }
  },
  components: {

  },
  computed:{
      txnsLength:function(){
          const txns=this.transactions.filter((v)=>v.shown==true)
          return txns.length;
      }
  },
  created(){
        
        axios.get('http://localhost:3000/transactions',{ headers: {
            'Authorization':this.$store.getters.currentToken
        } },)
        .then((response)=>{
          
            if(response.status==200){

              this.transactions = response.data.map((v) => ({
                ...v,
                shown:true
              }))

            }

        })
        .catch((error)=>{
            this.transactions=[];
        });

  },
  methods:{
    addTransaction(){

          if(this.amount=="" || this.description=="" || this.type==""){
              this.message.text='All fields are mandatory';  
              this.message.success=false;
              return false;
          }

          const body={
              "name": this.name,
              "amount": this.amount,
              "description": this.description,
              "type": this.type
          };


        axios.post('http://localhost:3000/add', body,{ headers: {
            'Authorization':this.$store.getters.currentToken
        } },)
        .then((response)=>{
 
            if(response.status==201){
              response.data.shown=true;
              this.transactions.push(response.data);
              this.amount='',
              this.description='',
              this.type='Credit',            
              this.message.text='Successfully created transaction';
              this.message.success=true;

            }else{
              this.message.text='Failed to create transaction';  
              this.message.success=false;
            }

            setTimeout(()=>{
              this.message.text='';
            },2000)
            
        })
        .catch((error)=>{
              this.message.text='Failed to create transaction';  
              this.message.success=false;

              setTimeout(()=>{
              this.message.text='';
            },2000)            
        });



    },
    filterDate(){

        const txns=this.transactions;
        const filteredTxns=[];     
        if(this.search!==""){

          for(const txn in txns){

              if(txns[txn].createdAt.split("T")[0]!=this.search){
                  txns[txn].shown=false;
              }else{
                  txns[txn].shown=true;
              }
              filteredTxns.push(txns[txn]);
          }

          this.transactions=filteredTxns;
 
        }


    },
    enableEdit(index){
        const txn=this.transactions[index];
        this.amount=txn.amount;
        this.description=txn.description;
        this.type=txn.type;
        this.underEdit=true;
        this.txnid=txn._id;
        this.txnindex=index;
    },
    editTransaction(){
          
          if(this.amount=="" || this.description=="" || this.type==""){
              this.message.text='All fields are mandatory';  
              this.message.success=false;
              return false;
          }

          const body={
              "name": this.name,
              "amount": this.amount,
              "description": this.description,
              "type": this.type
          };


        axios.patch(`http://localhost:3000/transaction/${this.txnid}`,body,{ headers: {
            'Authorization':this.$store.getters.currentToken
        } },)
        .then((response)=>{
 
            if(response.status==201){
              response.data.shown=true;
              this.transactions[this.txnindex]=response.data;

              this.amount='',
              this.description='',
              this.type='Credit',  
              this.message.text='Successfully updated transaction';
              this.message.success=true;

            }else{
              this.message.text='Failed to update transaction';  
              this.message.success=false;
            }

            setTimeout(()=>{
              this.message.text='';
            },2000)
            
        })
        .catch((error)=>{
              this.message.text='Failed to update transaction';  
              this.message.success=false;

              setTimeout(()=>{
              this.message.text='';
            },2000)            
        });



    },
    deleteTransaction(index){
        const txn=this.transactions[index];
        this.txnid=txn._id;
        axios.delete(`http://localhost:3000/transaction/${this.txnid}`,{ headers: {
            'Authorization':this.$store.getters.currentToken
        } },)
        .then((response)=>{

            if(response.status==200){
              this.transactions.splice(index, 1);
              
            }
            
        })
        .catch((error)=>{
         
        });



    }
  }
}
</script>
