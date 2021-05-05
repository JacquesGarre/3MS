<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\ModulesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;


/**
 * @ApiResource()
 * @ApiFilter(SearchFilter::class, properties={"active": "exact"})
 * @ORM\Entity(repositoryClass=ModulesRepository::class)
 * @ORM\HasLifecycleCallbacks()
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

    /**
     * @ORM\OneToMany(targetEntity=Inputs::class, mappedBy="module", orphanRemoval=true)
     */
    private $inputs;

    public function __construct()
    {
        $this->fields = new ArrayCollection();
        $this->inputs = new ArrayCollection();
    }

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


    /**
     * @return Collection|Inputs[]
     */
    public function getInputs(): Collection
    {
        return $this->inputs;
    }

    public function addInput(Inputs $input): self
    {
        if (!$this->inputs->contains($input)) {
            $this->inputs[] = $input;
            $input->setModule($this);
        }

        return $this;
    }

    public function removeInput(Inputs $input): self
    {
        if ($this->inputs->removeElement($input)) {
            // set the owning side to null (unless already changed)
            if ($input->getModule() === $this) {
                $input->setModule(null);
            }
        }

        return $this;
    }
}
