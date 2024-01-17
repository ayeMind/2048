import './App.css';
import Field from './components/filed/field';

const App = () => {
  return (
    <div className='relative content'>
      <div className='flex items-center justify-center w-screen h-screen'>
        <Field size={5} />
      </div>
    </div>
  );
};

export default App;
