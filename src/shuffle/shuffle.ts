import { shufflePart, sort } from "./common";
import { Shuffles } from "../types/shuffle";

function divideSegments(array, segments) {
  let newArray = [];

  for (let i = 0; i < segments; i++) {
    for (let j = 0; i + j < array.length; j += segments) {
      newArray.push(array[i + j]);
    }
  }

  for (let i = 0; i < array.length; i++) {
    array[i] = newArray[i];
  }
}

export default function shuffle(array, options) {
  let { shuffleAlgo, segments, amount, unit } = options;
  let indicesToRandom, valuesToRandom, sortedLength, setIndex, i, size;

  switch (shuffleAlgo) {
    case Shuffles.UNCHANGED:
      break;
    case Shuffles.ASC:
      sort(array);
      segments = Math.min(segments, array.length);
      divideSegments(array, segments);
      break;
    case Shuffles.DESC:
      sort(array, undefined, undefined, true);
      segments = Math.min(segments, array.length);
      divideSegments(array, segments);
      break;
    case Shuffles.ASC_DESC:
      sort(array);

      for (let i = 2; i < array.length; i += 2) {
        [array[i / 2], array[i]] = [array[i], array[i / 2]];
      }

      sort(array, Math.floor(array.length / 2), undefined, true);
      segments = Math.min(segments, array.length);
      divideSegments(array, segments);
      break;
    case Shuffles.DESC_ASC:
      sort(array, undefined, undefined, true);

      for (let i = 2; i < array.length; i += 2) {
        [array[i / 2], array[i]] = [array[i], array[i / 2]];
      }

      sort(array, Math.floor(array.length / 2));
      segments = Math.min(segments, array.length);
      divideSegments(array, segments);
      break;
    case Shuffles.RANDOM:
      for (let i = array.length - 1; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randIndex]] = [array[randIndex], array[i]];
      }

      break;
    case Shuffles.NOISY:
      size = Math.max(4, Math.floor(Math.sqrt(array.length) / 2));

      for (
        i = 0;
        i + size <= array.length;
        i += Math.floor(Math.random() * (size - 1)) + 1
      ) {
        shufflePart(array, i, i + size);
      }

      shufflePart(array, i, array.length);
      break;
    case Shuffles.SCRAMBLED_HEAD:
      indicesToRandom = Array(
        Math.round(
          unit === "element"
            ? amount
            : Math.floor((amount / 100) * array.length)
        )
      );

      valuesToRandom = Array(indicesToRandom);
      sortedLength = array.length - indicesToRandom.length;

      sort(array);

      for (let i = 0; i < indicesToRandom.length; i++) {
        let indexToRandom = Math.floor(
          (i / indicesToRandom.length) * array.length
        );

        indicesToRandom[i] = indexToRandom;
        valuesToRandom[i] = array[indexToRandom];
      }

      valuesToRandom.sort(() => 0.5 - Math.random());
      setIndex = array.length - 1;

      for (let i = array.length - 1; i >= 0; i--) {
        if (!indicesToRandom.includes(i)) {
          array[setIndex] = array[i];
          setIndex--;
        }

        if (i < indicesToRandom.length) {
          array[i] = valuesToRandom[i];
        }
      }

      break;
    case Shuffles.SCRAMBLED_TAIL:
      indicesToRandom = Array(
        Math.round(
          unit === "element"
            ? amount
            : Math.floor((amount / 100) * array.length)
        )
      );

      valuesToRandom = Array(indicesToRandom);
      sortedLength = array.length - indicesToRandom.length;

      sort(array);

      for (let i = 0; i < indicesToRandom.length; i++) {
        let indexToRandom = Math.floor(
          (i / indicesToRandom.length) * array.length
        );

        indicesToRandom[i] = indexToRandom;
        valuesToRandom[i] = array[indexToRandom];
      }

      valuesToRandom.sort(() => 0.5 - Math.random());
      setIndex = 0;

      for (let i = 0; i < array.length; i++) {
        if (!indicesToRandom.includes(i)) {
          array[setIndex] = array[i];
          setIndex++;
        }

        if (i >= sortedLength) {
          array[i] = valuesToRandom[i - sortedLength];
        }
      }

      break;
    default:
      throw new RangeError(`Invalid algorithm: ${shuffleAlgo}`);
  }

  return array;
}
