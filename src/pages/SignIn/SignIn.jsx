import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { api } from "../../services/api";
import "./signIn.css";

function SignIn() {
  const [mensagemErro, setmensagemErro] = useState([]);
  const navegarPara = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: ""
  });

  const tratarAlteracao = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setForm((old) => ({ ...old, [key]: value }));
  };

  const tratarEnvio = async (e) => {
    e.preventDefault();

    try {
      const usuario = {
        email: form.email,
        senha: form.senha
      };
      const response = await api.post("/login", usuario);
      localStorage.setItem("token", response.data.token);
      navegarPara("/Main");
    } catch (erro) {
      setmensagemErro(erro.response.data.mensagem);
    }
  };

  return (
    <div className="pageSignIn">
      <header>
        <img src={logo} alt="Logo-app" className="logo" />
        <h2>Dindin</h2>
      </header>
      <div className="main">
        <div className="content">
          <h1>
            Controle suas <span>finanças</span>, sem planilha chata.
          </h1>
          <p>
            Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você
            tem tudo num único lugar e em um clique de distância.
          </p>
          <Link to="../SignUp">
            <button>Cadastre-se</button>
          </Link>
        </div>
        <div className="formulario">
          <form onSubmit={tratarEnvio} className="form-principal">
            <p className="loginParagrafo">Login</p>
            <label htmlFor="email" className="labelEmail">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={tratarAlteracao}
            />
            <br />
            <label htmlFor="senha" className="labelSenha">
              Password
            </label>
            <input
              type="password"
              name="senha"
              id="senha"
              onChange={tratarAlteracao}
            />
            <br />
            <p className="erro">{mensagemErro}</p>
            <button>
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;