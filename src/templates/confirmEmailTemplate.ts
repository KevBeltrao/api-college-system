export default (link: string) => `
<div style="font-weight: bold;">
  <div
    style="
      background: #446DFF;
      width: 100%;
      text-align: center;
      padding-top: 10px;
      padding-bottom: 10px;
      color: #fff;
      margin-bottom: 10px;
    "
  >
    <p>College System</p>
    <p>CONFIRMAÇÃO DE EMAIL</p>  
  </div>
  
  Abra esse link para confirmar o email
  <a
  href="${link}">${link}</a>
</div>
`;
