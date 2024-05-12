import * as React from 'react';
import { render, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchCharacters } from '../loaders/CharacterLoader';
import Characters from './Characters';

vi.mock('../loaders/CharacterLoader.ts');

describe('Characters', () => {
  const mockCharacters = [
    { id: 1, name: 'Character 1', image: 'character1.jpg' },
    { id: 2, name: 'Character 2', image: 'character2.jpg' },
    { id: 3, name: 'Character 3', image: 'character3.jpg' },
  ];

  beforeEach(() => {
    fetchCharacters.mockReturnValue({ characters: mockCharacters });
  });

  it('renders a list of characters', () => {
    render(<Characters />);

    const characterList = screen.getByTestId('characters-list');
    expect(characterList).toBeInTheDocument();

    const characterLinks = screen.getAllByTestId(/character-link-\d+/);
    expect(characterLinks).toHaveLength(mockCharacters.length);
  });

  it('renders character details correctly', () => {
    render(<Characters />);

    const characterLinks = screen.getAllByTestId(/character-link-\d+/);

    characterLinks.forEach((link, index) => {
      const character = mockCharacters[index];
      expect(link).toHaveAttribute('href', `/character/${character.id}`);

      const characterImage = link.querySelector('img');
      expect(characterImage).toHaveAttribute('src', character.image);
      expect(characterImage).toHaveAttribute('alt', `${character.name} - Profile Image`);

      const characterName = link.querySelector('p');
      expect(characterName).toHaveTextContent(character.name);
    });
  });
});
