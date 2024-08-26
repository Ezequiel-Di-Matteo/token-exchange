import React from 'react';

const BalanceSection = ({
    account,
    connectWallet,
    disconnectWallet,
    balanceTokenA,
    balanceTokenB,
    withdrawAmountA,
    setWithdrawAmountA,
    withdrawTokenA,
    approveAmountA,
    setApproveAmountA,
    approveTokenA,
    depositAmountA,
    setDepositAmountA,
    depositTokenA,
    withdrawAmountB,
    setWithdrawAmountB,
    withdrawTokenB,
    approveAmountB,
    setApproveAmountB,
    approveTokenB,
    depositAmountB,
    setDepositAmountB,
    depositTokenB,
    reloadBalances,
    withdrawPendingBalances
}) => {
    return (
        <div id="balance">
            <div className="head-dv">
                <h2>Balance</h2>
            </div>
            {!account ? (
                <button className="button" onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <button className="button" onClick={disconnectWallet}>Disconnect wallet</button>
            )}

            <div className="cont-f">
                <h3>ONCE: {balanceTokenA}</h3>
                <form onSubmit={(e) => { e.preventDefault(); withdrawTokenA(); }}>
                    <input
                        type="text"
                        id="withdraw-amount"
                        placeholder="Withdraw amount"
                        value={withdrawAmountA}
                        onChange={(e) => setWithdrawAmountA(e.target.value)}
                    />
                    <button className="button" type="submit">Withdraw</button>
                </form>
                <form onSubmit={(e) => { e.preventDefault(); approveTokenA(); }}>
                    <input
                        type="text"
                        id="allow-amount"
                        placeholder="Allow amount"
                        value={approveAmountA}
                        onChange={(e) => setApproveAmountA(e.target.value)}
                    />
                    <button className="button" type="submit">Allow</button>
                </form>
                <form onSubmit={(e) => { e.preventDefault(); depositTokenA(); }}>
                    <input
                        type="text"
                        id="deposit-amount"
                        placeholder="Deposit amount"
                        value={depositAmountA}
                        onChange={(e) => setDepositAmountA(e.target.value)}
                    />
                    <button className="button" type="submit">Deposit</button>
                </form>
            </div>

            <div className="cont-f">
                <h3>USDC: {balanceTokenB}</h3>
                <form onSubmit={(e) => { e.preventDefault(); withdrawTokenB(); }}>
                    <input
                        type="text"
                        id="withdraw2-amount"
                        placeholder="Withdraw amount"
                        value={withdrawAmountB}
                        onChange={(e) => setWithdrawAmountB(e.target.value)}
                    />
                    <button className="button" type="submit">Withdraw</button>
                </form>
                <form onSubmit={(e) => { e.preventDefault(); approveTokenB(); }}>
                    <input
                        type="text"
                        id="allow2-amount"
                        placeholder="Allow amount"
                        value={approveAmountB}
                        onChange={(e) => setApproveAmountB(e.target.value)}
                    />
                    <button className="button" type="submit">Allow</button>
                </form>
                <form onSubmit={(e) => { e.preventDefault(); depositTokenB(); }}>
                    <input
                        type="text"
                        id="deposit2-amount"
                        placeholder="Deposit amount"
                        value={depositAmountB}
                        onChange={(e) => setDepositAmountB(e.target.value)}
                    />
                    <button className="button" type="submit">Deposit</button>
                </form>
            </div>

            <div className="botones">
                <button className="button" onClick={reloadBalances}>Reload</button>
                <button className="button" onClick={withdrawPendingBalances}>Withdraw all</button>
            </div>

            {!account ? (
                <p class="account-detection">Disconnected wallet</p>
            ) : (
                <p class="account-detection">Connected wallet: {account}</p>
            )}

        </div>
    );
};

export default BalanceSection;