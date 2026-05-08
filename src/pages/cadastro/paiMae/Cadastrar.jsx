import { TaskCoinLogo } from "./TaskCoinLogo";
import { ParentRegistrationForm } from "./ParentRegistrationForm";

export default function Cadastrar() { // mudei o nome do componente
  const handleRegistration = (data) => {
    console.log(data);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "412px",
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TaskCoinLogo />
        <ParentRegistrationForm onSubmit={handleRegistration} />
      </div>
    </div>
  );
}