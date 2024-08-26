import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import TokenExchangeABI from './TokenExchangeABI.json';
import ERC20ABI from './ERC20ABI.json';
import './App.css';
import OrderBook from './components/OrderBook';
import TradeSection from './components/TradeSection';
import BalanceSection from './components/BalanceSection';

const TokenExchange = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [tokenAContract, setTokenAContract] = useState(null);
    const [tokenBContract, setTokenBContract] = useState(null);
    const [balanceTokenA, setBalanceTokenA] = useState(null);
    const [balanceTokenB, setBalanceTokenB] = useState(null);
    const [depositAmountA, setDepositAmountA] = useState('');
    const [depositAmountB, setDepositAmountB] = useState('');
    const [sellOrders, setSellOrders] = useState([]);
    const [buyOrders, setBuyOrders] = useState([]);
    const [approveAmountA, setApproveAmountA] = useState('');
    const [approveAmountB, setApproveAmountB] = useState('');
    const [createBuyOrderPrice, setCreateBuyOrderPrice] = useState('');
    const [createBuyOrderAmount, setCreateBuyOrderAmount] = useState('');
    const [createSellOrderPrice, setCreateSellOrderPrice] = useState('');
    const [createSellOrderAmount, setCreateSellOrderAmount] = useState('');
    const [withdrawAmountA, setWithdrawAmountA] = useState('');
    const [withdrawAmountB, setWithdrawAmountB] = useState('');
    const [executeSellOrderPrice, setExecuteSellOrderPrice] = useState('');
    const [executeBuyOrderAmount, setExecuteBuyOrderAmount] = useState('');

    useEffect(() => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            setWeb3(web3);

            const contractAddress = '0xd01C0654f83EA99Bc9072D1932116a148fC01b59';
            const contractInstance = new web3.eth.Contract(TokenExchangeABI, contractAddress);
            setContract(contractInstance);

            const tokenAAddress = '0x6586AFEA218848b1d6c31068CeEb2a811065d384';
            const tokenBAddress = '0xa3FcC21283F5d8F00c9F7EE9Ebfc0b4b9b1a045f';
            setTokenAContract(new web3.eth.Contract(ERC20ABI, tokenAAddress));
            setTokenBContract(new web3.eth.Contract(ERC20ABI, tokenBAddress));

            if (account) {

                getInternalBalances();

                getSellOrders();

                getBuyOrders();

            }
        }
    }, [account]);
    
     const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
            } catch (error) {
                console.error("Error connecting to wallet:", error);
                alert('Failed to connect wallet.');
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
        setWeb3(null);
        setContract(null);
        setTokenAContract(null);
        setTokenBContract(null);
        setBalanceTokenA(null);
        setBalanceTokenB(null);
        // Se limpia cualquier otro estado si es necesario
    };

    const getInternalBalances = async () => {
        try {
            const balances = await contract.methods.getPendingBalances().call({ from: account });
            setBalanceTokenA(web3.utils.fromWei(balances.amountTokenA, 'ether'));
            setBalanceTokenB(web3.utils.fromWei(balances.amountTokenB, 'ether'));
        } catch (error) {
            console.error("Error fetching internal balances:", error);
        }
    };

    const reloadBalances = () => {
        getInternalBalances();
    };

    const reloadOrders = () => {
        getBuyOrders();
        getSellOrders();
    };

    const withdrawPendingBalances = async () => {
        try {
            await contract.methods.withdrawPendingBalances().send({
                from: account,
                gasPrice: web3.utils.toWei('30', 'gwei')
            });
            alert('Withdrawal successful!');
            getInternalBalances();
        } catch (error) {
            console.error("Error withdrawing pending balances:", error);
            alert('Withdrawal failed!');
        }
    };

    const depositTokenA = async () => {
        try {
            const amountInWei = web3.utils.toWei(depositAmountA, 'ether');
            await contract.methods.depositTokenA(amountInWei).send({
                from: account,
                gasPrice: web3.utils.toWei('30', 'gwei')
            });
            alert(`Deposited ${depositAmountA} ONCE`);
            setDepositAmountA('');
            getInternalBalances();
        } catch (error) {
            console.error("Error depositing ONCE:", error);
            alert('Deposit failed!');
        }
    };

    const depositTokenB = async () => {
        try {
            const amountInWei = web3.utils.toWei(depositAmountB, 'ether');
            await contract.methods.depositTokenB(amountInWei).send({
                from: account,
                gasPrice: web3.utils.toWei('30', 'gwei')
            });
            alert(`Deposited ${depositAmountB} USDC`);
            setDepositAmountB('');
            getInternalBalances();
        } catch (error) {
            console.error("Error depositing USDC:", error);
            alert('Deposit failed!');
        }
    };

    const approveTokenA = async () => {
        try {
            const amountInWei = web3.utils.toWei(approveAmountA, 'ether');
            await tokenAContract.methods.approve(contract.options.address, amountInWei).send({
                from: account,
                gasPrice: web3.utils.toWei('30', 'gwei')
            });
            alert(`Approved ${approveAmountA} ONCE`);
            setApproveAmountA('');
        } catch (error) {
            console.error("Error approving ONCE:", error);
            alert('Approval failed!');
        }
    };

    const approveTokenB = async () => {
        try {
            const amountInWei = web3.utils.toWei(approveAmountB, 'ether');
            await tokenBContract.methods.approve(contract.options.address, amountInWei).send({
                from: account,
                gasPrice: web3.utils.toWei('30', 'gwei')
            });
            alert(`Approved ${approveAmountB} USDC`);
            setApproveAmountB('');
        } catch (error) {
            console.error("Error approving USDC:", error);
            alert('Approval failed!');
        }
    };

    const withdrawTokenA = async () => {
        try {
            const amountInWei = web3.utils.toWei(withdrawAmountA, 'ether');
            await contract.methods.withdrawTokenA(amountInWei).send({
                from: account,
                gasPrice: web3.utils.toWei('30', 'gwei')
            });
            alert(`Withdrew ${withdrawAmountA} ONCE`);
            getInternalBalances();
        } catch (error) {
            console.error("Error withdrawing ONCE:", error);
            alert('Withdrawal failed!');
        }
    };

    const withdrawTokenB = async () => {
        try {
            const amountInWei = web3.utils.toWei(withdrawAmountB, 'ether');
            await contract.methods.withdrawTokenB(amountInWei).send({
                from: account,
                gasPrice: web3.utils.toWei('30', 'gwei')
            });
            alert(`Withdrew ${withdrawAmountB} USDC`);
            getInternalBalances();
        } catch (error) {
            console.error("Error withdrawing USDC:", error);
            alert('Withdrawal failed!');
        }
    };

    const createBuyOrder = async () => {
        try {
            const priceInWei = web3.utils.toWei(createBuyOrderPrice, 'ether');
            const amountInWei = web3.utils.toWei(createBuyOrderAmount, 'ether');
            await contract.methods.addBuyOrderUsingInternalBalance(priceInWei, amountInWei).send({
                from: account,
                gasPrice: web3.utils.toWei('30', 'gwei')
            });
            alert('Buy order created successfully!');
            setCreateBuyOrderPrice('');
            setCreateBuyOrderAmount('');
            getSellOrders();
            getBuyOrders();
        } catch (error) {
            console.error("Error creating buy order:", error);
            alert('Buy order creation failed!');
        }
    };

    const createSellOrder = async () => {
        try {
            const priceInWei = web3.utils.toWei(createSellOrderPrice, 'ether');
            const amountInWei = web3.utils.toWei(createSellOrderAmount, 'ether');
            await contract.methods.addSellOrderUsingInternalBalance(priceInWei, amountInWei).send({
                from: account,
                gasPrice: web3.utils.toWei('30', 'gwei')
            });
            alert('Sell order created successfully!');
            setCreateSellOrderPrice('');
            setCreateSellOrderAmount('');
            getSellOrders();
            getBuyOrders();
        } catch (error) {
            console.error("Error creating sell order:", error);
            alert('Sell order creation failed!');
        }
    };

    const executeBuyOrderAtMarket = async () => {
      try {
          // Verificar que el precio y la cantidad no estén vacíos
          if (!executeBuyOrderAmount) {
              alert('Please enter amount.');
              return;
          }
  
          // Convertir el precio y la cantidad a wei
          const amountInWei = web3.utils.toWei(executeBuyOrderAmount, 'ether');
  
          // Llamar al método del contrato
          await contract.methods.executeBuyOrderAtMarketUsingInternalBalance(amountInWei).send({
              from: account,
              gasPrice: web3.utils.toWei('30', 'gwei')
          });
  
          alert('Buy order executed successfully!');
          setExecuteBuyOrderAmount('');
          getSellOrders();
          getBuyOrders();
      } catch (error) {
          console.error("Error executing buy order:", error);
          alert('Buy order execution failed!');
      }
  };

    const executeSellOrderAtMarket = async () => {
        try {
            const priceInWei = web3.utils.toWei(executeSellOrderPrice, 'ether');
            await contract.methods.executeSellOrderAtMarketUsingInternalBalance(priceInWei).send({
                from: account,
                gasPrice: web3.utils.toWei('30', 'gwei')
            });
            alert('Sell order executed successfully!');
            setExecuteSellOrderPrice('');
            getSellOrders();
            getBuyOrders();
        } catch (error) {
            console.error("Error executing sell order:", error);
            alert('Sell order execution failed!');
        }
    };

    const getSellOrders = async () => {
        try {
            const orders = await contract.methods.getSellOrders().call();
            const formattedOrders = orders.map(order => ({
                price: (parseFloat(order.price) / 1e36).toFixed(18),
                amount: parseFloat(web3.utils.fromWei(order.amount, 'ether')).toFixed(18),
                user: order.user
            }));

            const orderMap = formattedOrders.reduce((acc, { price, amount }) => {
                const parsedPrice = parseFloat(price);
                if (acc[parsedPrice]) {
                    acc[parsedPrice] += parseFloat(amount);
                } else {
                    acc[parsedPrice] = parseFloat(amount);
                }
                return acc;
            }, {});

            const sortedOrders = Object.keys(orderMap)
                .sort((a, b) => parseFloat(a) - parseFloat(b))
                .map(price => ({
                    price: parseFloat(price).toFixed(2),
                    totalAmount: orderMap[price].toFixed(2)
                }));

            setSellOrders(sortedOrders);
        } catch (error) {
            console.error("Error fetching sell orders:", error);
        }
    };

    const getBuyOrders = async () => {
        try {
            const orders = await contract.methods.getBuyOrders().call();
            const formattedOrders = orders.map(order => ({
                price: (parseFloat(order.price) / 1e36).toFixed(18),
                amount: parseFloat(web3.utils.fromWei(order.amount, 'ether')).toFixed(18),
                user: order.user
            }));

            const orderMap = formattedOrders.reduce((acc, { price, amount }) => {
                const parsedPrice = parseFloat(price);
                if (acc[parsedPrice]) {
                    acc[parsedPrice] += parseFloat(amount);
                } else {
                    acc[parsedPrice] = parseFloat(amount);
                }
                return acc;
            }, {});

            const sortedOrders = Object.keys(orderMap)
                .sort((a, b) => parseFloat(a) - parseFloat(b))
                .map(price => ({
                    price: parseFloat(price).toFixed(2),
                    totalAmount: orderMap[price].toFixed(2)
                }));

            setBuyOrders(sortedOrders);
        } catch (error) {
            console.error("Error fetching buy orders:", error);
        }
    };

    return (
        <div class="flexbox-container">
          
          <div>
          <OrderBook 
                    tokenA="ONCE"
                    tokenB="USDC"
                    sellOrders={sellOrders.map(order => ({
                        price: order.price,
                        amountA: order.totalAmount,
                        amountB: (parseFloat(order.price) * parseFloat(order.totalAmount)).toFixed(2)
                    }))}
                    buyOrders={buyOrders.map(order => ({
                        price: order.price,
                        amountA: order.totalAmount,
                        amountB: (parseFloat(order.price) * parseFloat(order.totalAmount)).toFixed(2)
                    }))}
                    currentPrice={sellOrders[0]?.price || buyOrders[buyOrders.length - 1]?.price || 'N/A'}
                    onRefresh={reloadOrders}
            />
          </div>

            <div>
            <TradeSection 
                    executeBuyOrderAmount={executeBuyOrderAmount}
                    setExecuteBuyOrderAmount={setExecuteBuyOrderAmount}
                    executeBuyOrderAtMarket={executeBuyOrderAtMarket}
                    executeSellOrderPrice={executeSellOrderPrice}
                    setExecuteSellOrderPrice={setExecuteSellOrderPrice}
                    executeSellOrderAtMarket={executeSellOrderAtMarket}
                    createBuyOrderAmount={createBuyOrderAmount}
                    setCreateBuyOrderAmount={setCreateBuyOrderAmount}
                    createBuyOrderPrice={createBuyOrderPrice}
                    setCreateBuyOrderPrice={setCreateBuyOrderPrice}
                    createBuyOrder={createBuyOrder}
                    createSellOrderAmount={createSellOrderAmount}
                    setCreateSellOrderAmount={setCreateSellOrderAmount}
                    createSellOrderPrice={createSellOrderPrice}
                    setCreateSellOrderPrice={setCreateSellOrderPrice}
                    createSellOrder={createSellOrder}
            />
            </div>
            
            <div>
            <BalanceSection 
                    account={account}
                    connectWallet={connectWallet}
                    disconnectWallet={disconnectWallet}
                    balanceTokenA={balanceTokenA}
                    balanceTokenB={balanceTokenB}
                    withdrawAmountA={withdrawAmountA}
                    setWithdrawAmountA={setWithdrawAmountA}
                    withdrawTokenA={withdrawTokenA}
                    approveAmountA={approveAmountA}
                    setApproveAmountA={setApproveAmountA}
                    approveTokenA={approveTokenA}
                    depositAmountA={depositAmountA}
                    setDepositAmountA={setDepositAmountA}
                    depositTokenA={depositTokenA}
                    withdrawAmountB={withdrawAmountB}
                    setWithdrawAmountB={setWithdrawAmountB}
                    withdrawTokenB={withdrawTokenB}
                    approveAmountB={approveAmountB}
                    setApproveAmountB={setApproveAmountB}
                    approveTokenB={approveTokenB}
                    depositAmountB={depositAmountB}
                    setDepositAmountB={setDepositAmountB}
                    depositTokenB={depositTokenB}
                    reloadBalances={reloadBalances}
                    withdrawPendingBalances={withdrawPendingBalances}
            />
            </div>
        </div>
    );
};

export default TokenExchange;