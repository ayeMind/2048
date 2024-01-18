import Button from "../button/button"; 

const Menu = () => {
  return (
    <div className="relative content">
      <div className="flex items-center justify-center w-screen h-screen">
        <h1 className="absolute -translate-x-1/2 top-10 left-1/2">
          Выберите размер поля
        </h1>
        <div className="grid grid-cols-3 gap-[64px]">
          <Button size={3} />
          <Button size={4} />
          <Button size={5} />
          <Button size={6} />
          <Button size={7} />
          <Button size={8} />
        </div>
      </div>
    </div>
  );
};

export default Menu;