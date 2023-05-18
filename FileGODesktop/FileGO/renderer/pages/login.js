import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const Title = styled.h1`
  margin: 0;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  height: 40px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 500;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 3px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #007aff;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #006fe6;
  }
`;

const Home = () => {
  return (
    <Container>
      <Card>
        <Title>Welcome to MyApp</Title>
        <Label>Email</Label>
        <Input type="email" />
        <Label>Password</Label>
        <Input type="password" />
        <Button>Login</Button>
        <Link href="/signup">
          <a className="button button-signup">Sign up</a>
        </Link>
      </Card>
    </Container>
  );
};

export default Home;
