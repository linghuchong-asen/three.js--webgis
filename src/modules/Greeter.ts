class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greeter() {
    console.log('hello ts');
  }
}

const greeter = new Greeter('zhangsan');
greeter.greeter();
const funGreeter = (a: string): string => {
  console.log(a);
  return a;
};
funGreeter('zhangsan');
export { Greeter };
export default funGreeter;
