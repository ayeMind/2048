import Button from "../button/button"; 

const Menu = () => {
  return (
    <div className="relative content">
      <div className="flex items-center justify-center w-screen h-screen">
        <h1 className="absolute top-[24px] text-[36px] lg:text-[48px] -translate-x-1/2 sm:top-[6px] md:top-[6px] lg:top-[12px] left-1/2">
          Выберите размер поля
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[12px] md:gap-[32px] lg:gap-[64px]">
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