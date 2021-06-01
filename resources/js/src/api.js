const axios = window.axios;

export default {
  getSunstudies: () => axios.get('http://localhost/api/sunstudies'),
  getSunstudy: (id) => axios.get(`http://localhost/api/sunstudies/${id}`),
  createSunstudy: (body) => axios.post('http://localhost/api/sunstudies', body),
  updateSunstudy: (id, body) => axios.post(`http://localhost/api/sunstudies/${id}?_method=PUT`, body),
  deleteSunstudy: (id) => axios.delete(`http://localhost/api/sunstudies/${id}`),
  deleteImages: (ids) => axios.delete(`http://localhost/api/images/${ids}`),
  uploadImages: (body) => axios.post('http://localhost/api/images', body)
}