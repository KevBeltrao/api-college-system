export default ({
  name,
  email,
  message,
}: {
  name: string,
  email: string,
  message: string,
}) => `
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
    <p>Contato</p>  
  </div>
  Usuário:
  <br />
  ${name}
  <br />
  ${email}
  <br />
  Mensagem:
  <br />
  ${message}
</div>
`;
