import '@testing-library/react'
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import { mockProjects } from '../../../mock/projects'


it('should render ProjectCard component', () => {
  const openModal = jest.fn();
  const project = mockProjects[0];

  render(<ProjectCard openModal={openModal} project={project}/>);

  const name = screen.getByText(project.name);
  expect(name).toBeDefined();
})

it('should click view detail button', () => {

  const openModal = jest.fn();
  const project = mockProjects[0];

  const card = render(<ProjectCard openModal={openModal} project={project}/>);

  const detailBtn = card.container.querySelector('button');
  detailBtn?.click();

  expect(openModal).toBeCalledTimes(1);
})