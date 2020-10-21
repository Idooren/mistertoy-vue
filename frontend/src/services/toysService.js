
import HttpService from './HttpService';

export default {
  query,
  add,
  remove,
  update,
  getById,
};

function query() {
  return HttpService.get('toy');
}

function getById(id) {
  return HttpService.get(`toy/${id}`);
}

function remove(id) {
  return HttpService.delete(`toy/${id}`);
}

function update(toy) {
  return HttpService.put(`toy/${toy._id}`, toy);
}

async function add(toy) {
  const addedToy = await HttpService.post('toy/', toy);
  return addedToy;
}
