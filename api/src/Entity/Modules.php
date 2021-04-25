<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\ModulesRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ApiFilter(SearchFilter::class, properties={"active": "exact"})
 * @ORM\Entity(repositoryClass=ModulesRepository::class)
 */
class Modules
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $slug;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $form_id;

    /**
     * @ORM\Column(type="boolean")
     */
    private $active;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $limit_per_page;

    /**
     * @ORM\Column(type="integer")
     */
    private $menu_order;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $icon;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getFormId(): ?int
    {
        return $this->form_id;
    }

    public function setFormId(?int $form_id): self
    {
        $this->form_id = $form_id;

        return $this;
    }

    public function getActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): self
    {
        $this->active = $active;

        return $this;
    }

    public function getLimitPerPage(): ?int
    {
        return $this->limit_per_page;
    }

    public function setLimitPerPage(?int $limit_per_page): self
    {
        $this->limit_per_page = $limit_per_page;

        return $this;
    }

    public function getMenuOrder(): ?int
    {
        return $this->menu_order;
    }

    public function setMenuOrder(int $menu_order): self
    {
        $this->menu_order = $menu_order;

        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(?string $icon): self
    {
        $this->icon = $icon;

        return $this;
    }
}
