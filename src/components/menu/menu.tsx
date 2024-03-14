import Button from "../button/button"; 

const Menu = () => {
  return (
    <div className="relative content">
      <div className="flex items-center justify-center w-screen h-screen">
        <h1 className="absolute sm:text-[12px] md:text-[16px] -translate-x-1/2 sm:top-[24px] md:top-[36px] lg:top-[135px] left-1/2">
          Выберите размер поля
        </h1>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 sm:gap-[12px] lg:gap-[64px]">
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