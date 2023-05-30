const add = (a: number, b: number) => a + b;

const curriedAdd = (a: number) => (b: number) => a + b;

add(2, 3); // 5
curriedAdd(2)(3); // 5

// Currying
type Incrementor = (value: number) => number;
const inc: Incrementor = curriedAdd(1);
const inc10: Incrementor = curriedAdd(10);
const inc100: Incrementor = curriedAdd(100);

inc(3) // 4
inc10(3) // 13
inc100(3) // 103

// Why
{
  const f: Incrementor = n => n + 1;
  const g: Incrementor = n => n * 2;
  const h: Incrementor = x => f(g(x));
  h(20); // 42

  const compose = (f: Incrementor, g: Incrementor) => (value: number) => f(g(value)); // If we want to add a new function to or "pipe" its more code to code
  const funCompose = (...fns: Incrementor[]) => (value: number) => fns.reduceRight((result, incrementor) => incrementor(result), value);
  const funH = funCompose(f, g);
  funH(20) // 42
  funCompose(x => x *= -1, f, g); // -42

  // All good but it can be tricky to debug
  const trace = (label: string) => (value: number) => {
    console.log(`${label}: ${value}`);
    return value;
  }

  funCompose(
    trace("after invert"),
    x => x *= -1,
    trace("after f"),
    f,
    trace("after g"),
    g
  )(20);
  // after g: 40
  // after f: 42
  // after invert: -42

  // Compose is read bottom to top which can be meh
  // We can reverse it
  const pipe = <ValueType>(...fns: CallableFunction[]) => (value: ValueType) => fns.reduce((current, callable) => callable(current), value);
  pipe<number>(f, g, (x: number) => x *= -1)(20); // -42
}

{
  // curryng and hof
  type FilterPredicate = (word: string) => boolean;
  // Note that filter is a data last function...
  const filter = (fn: FilterPredicate, words: string[]) => words.reduce((filtered, word) => fn(word) ? filtered.concat(word) : filtered, [] as string[]);
  const curriedFilter = (fn: FilterPredicate) => (words: string[]) => words.reduce((filtered, word) => fn(word) ? filtered.concat(word) : filtered, [] as string[]);
  const censor = curriedFilter((word: string) => word.length !== 4);
  const startsWithS = curriedFilter((word: string) => word.startsWith('s'));
}
