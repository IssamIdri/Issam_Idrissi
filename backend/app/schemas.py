from pydantic import BaseModel, ConfigDict, EmailStr, Field


class Profile(BaseModel):
    name: str
    title: str
    subtitle: str
    location: str
    mobility: str
    availability: str
    about: str
    email: EmailStr
    linkedin: str
    github: str
    cv_url: str
    focus_areas: list[str]
    strengths: list[str]


class SkillCategory(BaseModel):
    id: str
    name: str
    skills: list[str]


class Experience(BaseModel):
    id: str
    title: str
    company: str
    location: str
    contract_type: str
    start_date: str
    end_date: str
    missions: list[str]
    technologies: list[str]


class Project(BaseModel):
    id: str
    title: str
    description: str
    technologies: list[str]
    github_url: str
    demo_url: str | None = None


class ContactMessage(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(min_length=10, max_length=5000)


class ContactResponse(BaseModel):
    success: bool
    message: str


class AssistantQuestion(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    question: str = Field(min_length=2, max_length=500)


class AssistantResponse(BaseModel):
    answer: str
    topic: str | None = None
    suggestions: list[str] = []
