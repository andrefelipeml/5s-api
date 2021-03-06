var models = require('../models')
var db = require('../models/index')
var genericDAO = require('../dao/GenericDAO')

module.exports = class EnviromentTypeController {
	constructor(req, res){
		this.req = req
		this.res = res
		this.dao = new genericDAO()
	}

	save(enviromentType){
		this.dao.save(models.EnviromentType, enviromentType)
			.then(() => {
				return this.res.status(201).json({
					type: 'success', message: 'Tipo de ambiente salvo com sucesso!'
				})
			})
			.catch((error) => {   
				return this.res.status(500).json({
					message: 'Ocorreu um erro ao tentar salvar', errorDetails: error
				})
			})
	}

	load(){
		this.dao.load(models.EnviromentType) 
			.then(enviromentTypes => {
				return this.res.json(enviromentTypes)
			})
			.catch((error) => {
				return this.res.status(500).json({errorDetails: error})
			})
	}

	update(enviromentType){
		this.dao.update(models.EnviromentType, enviromentType)
			.then(() => {
				return this.res.status(200).json({
					type: 'success', message: 'Tipo de ambiente salvo com sucesso!'
				})
			})
			.catch((error) => {
				return this.res.status(500).json({
					type: 'error', message: 'Ocorreu um erro ao tentar atualizar!', errorDetails: error
				})
			})
	}

	remove(){
		this.dao.remove(models.EnviromentType, this.req.params.id )
			.then((deletedRecord) => {
				if(deletedRecord)
					return this.res.status(200).json({
						type: 'success', message: 'Removido com sucesso!'
					})         
				else
					return this.res.status(404).json({
						type: 'error', message: 'Registro não encontrado!'
					}) 
			})
			.catch((error) => {
				return this.res.status(500).json({
					type: 'warning',
					message: 'Não é possível remover um tipo de ambiente que está vinculado a um ambiente',
					errorDetails: error
				}) 
			})
	}

	removeAssociatedItems(questionId) {
		models.EnviromentTypeQuestion.destroy({
			where: {    
				questions_id: questionId 
			}
		})
			.then(() => {
				return this.res.status(200).json({type: 'success', msg: 'Tipos de ambientes foram removidos!'})
			})
			.catch((error) =>{
				return this.res.status(500).json({errorDetails: error})
			})
	}

	loadEnviromentsTypeByUnit() {
		db.sequelize.query(
			'select distinct et.name, et.id from enviroments e ' +
            'inner join enviroment_types et on et.id = e.enviroment_types_id ' +
            'where e.units_id = ' + this.req.params.unitId,
			{ type: db.sequelize.QueryTypes.SELECT })
			.then(enviroments => {
				return this.res.status(200).json(enviroments)
			})
			.catch((error) =>{
				return this.res.status(500).json({
					type: 'error', message: 'Erro de servidor', errorDetails: error
				})
			})
	}
}