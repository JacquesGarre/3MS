<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210505173500 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE inputs (id INT AUTO_INCREMENT NOT NULL, module_id_id INT NOT NULL, name VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, sql_type VARCHAR(255) NOT NULL, sql_length INT DEFAULT NULL, required TINYINT(1) NOT NULL, add_show TINYINT(1) NOT NULL, edit_show TINYINT(1) NOT NULL, edit_readonly TINYINT(1) NOT NULL, table_show TINYINT(1) NOT NULL, table_readonly TINYINT(1) NOT NULL, table_filter TINYINT(1) NOT NULL, table_order TINYINT(1) NOT NULL, INDEX IDX_361A04E7648EE39 (module_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE inputs_inputs (inputs_source INT NOT NULL, inputs_target INT NOT NULL, INDEX IDX_419DA9141D767629 (inputs_source), INDEX IDX_419DA91449326A6 (inputs_target), PRIMARY KEY(inputs_source, inputs_target)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE inputs ADD CONSTRAINT FK_361A04E7648EE39 FOREIGN KEY (module_id_id) REFERENCES modules (id)');
        $this->addSql('ALTER TABLE inputs_inputs ADD CONSTRAINT FK_419DA9141D767629 FOREIGN KEY (inputs_source) REFERENCES inputs (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE inputs_inputs ADD CONSTRAINT FK_419DA91449326A6 FOREIGN KEY (inputs_target) REFERENCES inputs (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE inputs_inputs DROP FOREIGN KEY FK_419DA9141D767629');
        $this->addSql('ALTER TABLE inputs_inputs DROP FOREIGN KEY FK_419DA91449326A6');
        $this->addSql('DROP TABLE inputs');
        $this->addSql('DROP TABLE inputs_inputs');
    }
}
