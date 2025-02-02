import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiErrors.js'
import { Skill } from '../models/skills.model.js'

const createSkills = asyncHandler(async (req, res) => {

  const { name, category, proficiency, icon } = req.body;

  if (!name) {
    throw new ApiError(400, "skill name is required")
  }

  const existingSkill = await Skill.findOne({ name: { $regex: new RegExp("^" + name + "$", "i") } });
  if (existingSkill) {
    throw new ApiError(409, "Skill already exists");
  }

  const skill = await Skill.create({
    name,
    category,
    proficiency,
    icon,
  })

  return res.status(201).json(
    new ApiResponse(200, "Skill created succefully", skill)
  )

})

const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find();
  res.status(200).json(
    new ApiResponse(200, "skill fetch successfully", skills)
  )
})

const deleteSkills = asyncHandler(async (req, res) => {

  const skill = await Skill.findById(req.params.id)

  if(!skill){
    throw new ApiError(404, "skill not found")
  }

  await skill.deleteOne();
  return res.status(200).json(
    new ApiResponse(200, "skill deleted successfully")
  )

})

export { createSkills, getSkills, deleteSkills }

