import { useLanguage } from "./i18n.jsx";

export default function TokenList() {
  const { t } = useLanguage();
  
  // این بخش به صورت نمونه است؛ اگر توکن‌ها را از لوکال‌استوریج یا سرور می‌خوانید منطق آن حفظ می‌شود
  const tokens = JSON.parse(localStorage.getItem("deployedTokens") || "[]");

  if (tokens.length === 0) {
    return (
      <section className="token-list-section" id="listing">
        <h2 className="section-title">{t.deployedTokensTitle || "Tokens"}</h2>
        <p className="no-tokens">{t.noTokensMessage || "No tokens deployed yet."}</p>
      </section>
    );
  }

  return (
    <section className="token-list-section" id="listing">
      <h2 className="section-title">{t.deployedTokensTitle || "Tokens"}</h2>
      <div className="table-responsive">
        <table className="token-table">
          <thead>
            <tr>
              <th>{t.tableNameLabel || "Name"}</th>
              <th>{t.tableSymbolLabel || "Symbol"}</th>
              <th>{t.tableSupplyLabel || "Supply"}</th>
              <th>{t.tableAddressLabel || "Address"}</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((tk, index) => (
              <tr key={index}>
                <td>{tk.name}</td>
                <td>{tk.symbol}</td>
                <td>{tk.totalSupply}</td>
                <td>
                  <a 
                    href={`https://polygonscan.com/token/${tk.tokenAddress}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="token-link"
                  >
                    {tk.tokenAddress.slice(0, 6)}…{tk.tokenAddress.slice(-4)}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
