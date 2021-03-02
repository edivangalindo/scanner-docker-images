const useResult = () => {
    const context = require.context('../../results', true, /.json$/);
    const all = {};
    context.keys().forEach(key => {
      const fileName = key.replace('./', '');
      const resource = require(`../../results/${fileName}`);
      const namespace = fileName.replace('.json', '');
      all[namespace] = JSON.parse(JSON.stringify(resource));
    });
    console.log(all)
    
    return all;
}

export default useResult;