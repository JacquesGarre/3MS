<?php

namespace App\Entity;

use App\Repository\InputsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=InputsRepository::class)
 */
class Inputs
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
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity=Modules::class, inversedBy="inputs")
     * @ORM\JoinColumn(nullable=false)
     */
    private $module;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $sql_type;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $sql_length;

    /**
     * @ORM\ManyToMany(targetEntity=Inputs::class, inversedBy="inputs")
     */
    private $list_inputs;

    /**
     * @ORM\Column(type="boolean")
     */
    private $required;

    /**
     * @ORM\Column(type="boolean")
     */
    private $add_show;

    /**
     * @ORM\Column(type="boolean")
     */
    private $edit_show;

    /**
     * @ORM\Column(type="boolean")
     */
    private $edit_readonly;

    /**
     * @ORM\Column(type="boolean")
     */
    private $table_show;

    /**
     * @ORM\Column(type="boolean")
     */
    private $table_readonly;

    /**
     * @ORM\Column(type="boolean")
     */
    private $table_filter;

    /**
     * @ORM\Column(type="boolean")
     */
    private $table_order;

    public function __construct()
    {
        $this->list_inputs = new ArrayCollection();
        $this->inputs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getModule(): ?Modules
    {
        return $this->module;
    }

    public function setModule(?Modules $module): self
    {
        $this->module = $module;

        return $this;
    }

    public function getSqlType(): ?string
    {
        return $this->sql_type;
    }

    public function setSqlType(string $sql_type): self
    {
        $this->sql_type = $sql_type;

        return $this;
    }

    public function getSqlLength(): ?int
    {
        return $this->sql_length;
    }

    public function setSqlLength(?int $sql_length): self
    {
        $this->sql_length = $sql_length;

        return $this;
    }

    /**
     * @return Collection|self[]
     */
    public function getListInputs(): Collection
    {
        return $this->list_inputs;
    }

    public function addListInput(self $listInput): self
    {
        if (!$this->list_inputs->contains($listInput)) {
            $this->list_inputs[] = $listInput;
        }

        return $this;
    }

    public function removeListInput(self $listInput): self
    {
        $this->list_inputs->removeElement($listInput);

        return $this;
    }

    public function getRequired(): ?bool
    {
        return $this->required;
    }

    public function setRequired(bool $required): self
    {
        $this->required = $required;

        return $this;
    }

    public function getAddShow(): ?bool
    {
        return $this->add_show;
    }

    public function setAddShow(bool $add_show): self
    {
        $this->add_show = $add_show;

        return $this;
    }

    public function getEditShow(): ?bool
    {
        return $this->edit_show;
    }

    public function setEditShow(bool $edit_show): self
    {
        $this->edit_show = $edit_show;

        return $this;
    }

    public function getEditReadonly(): ?bool
    {
        return $this->edit_readonly;
    }

    public function setEditReadonly(bool $edit_readonly): self
    {
        $this->edit_readonly = $edit_readonly;

        return $this;
    }

    public function getTableShow(): ?bool
    {
        return $this->table_show;
    }

    public function setTableShow(bool $table_show): self
    {
        $this->table_show = $table_show;

        return $this;
    }

    public function getTableReadonly(): ?bool
    {
        return $this->table_readonly;
    }

    public function setTableReadonly(bool $table_readonly): self
    {
        $this->table_readonly = $table_readonly;

        return $this;
    }

    public function getTableFilter(): ?bool
    {
        return $this->table_filter;
    }

    public function setTableFilter(bool $table_filter): self
    {
        $this->table_filter = $table_filter;

        return $this;
    }

    public function getTableOrder(): ?bool
    {
        return $this->table_order;
    }

    public function setTableOrder(bool $table_order): self
    {
        $this->table_order = $table_order;

        return $this;
    }

}
