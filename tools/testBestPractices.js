import {
  fetchBestPracticeEntriesWithFullScan,
} from './fetchBestPractices';
async function main() {
  const data = await fetchBestPracticeEntriesWithFullScan({
    cache: [],
    preferCache: false
  });
  console.info(data);
}
console.info('g');
main();
