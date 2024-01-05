import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { api } from "../../services/api";
import "./signUp.css";

function SignUp() {
  const [mensagemErro, setmensagemErro] = useState([]);
  const Navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setForm((prevState) => ({ ...prevState, [event.target.id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.senha !== form.confirmarSenha) {
      let teste = {
        mensagem: "As Senhas não conferem!",
      };

      return setmensagemErro(teste.mensagem);
    }

    try {
      const usuario = {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
      };
      await api.post("/usuario", usuario);
      Navigate("/");
    } catch (erro) {
      setmensagemErro(erro.response.data.mensagem);
    }
  };

  return (
    <div className="pageSignUp">
      <header>
        <img src={logo} alt="Logo-app" className="logo" />
        <h2>Dindin</h2>
      </header>
      <div className="body">
        <form onSubmit={handleSubmit} className="form-principal">
          <p className="loginParagrafo">Cadastre-se</p>
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" id="nome" onChange={handleChange} />
          <br />
          <label htmlFor="email">E-mail</label>
          <input type="email" name="email" id="email" onChange={handleChange} />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="senha"
            id="senha"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="confirmarSenha">Confirmação de senha</label>
          <input
            type="password"
            name="confirmarSenha"
            id="confirmarSenha"
            onChange={handleChange}
          />
          <p className="erro">{mensagemErro}</p>
          <button>Cadastrar</button>
          <p className="paragrafo">
            Já tem cadastro? <Link to="/">Clique aqui!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
