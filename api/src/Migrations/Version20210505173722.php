<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210505173722 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE inputs DROP FOREIGN KEY FK_361A04E7648EE39');
        $this->addSql('DROP INDEX IDX_361A04E7648EE39 ON inputs');
        $this->addSql('ALTER TABLE inputs CHANGE module_id_id module_id INT NOT NULL');
        $this->addSql('ALTER TABLE inputs ADD CONSTRAINT FK_361A04EAFC2B591 FOREIGN KEY (module_id) REFERENCES modules (id)');
        $this->addSql('CREATE INDEX IDX_361A04EAFC2B591 ON inputs (module_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE inputs DROP FOREIGN KEY FK_361A04EAFC2B591');
        $this->addSql('DROP INDEX IDX_361A04EAFC2B591 ON inputs');
        $this->addSql('ALTER TABLE inputs CHANGE module_id module_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE inputs ADD CONSTRAINT FK_361A04E7648EE39 FOREIGN KEY (module_id_id) REFERENCES modules (id)');
        $this->addSql('CREATE INDEX IDX_361A04E7648EE39 ON inputs (module_id_id)');
    }
}
