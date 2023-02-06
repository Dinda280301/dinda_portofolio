package com.prodemy.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author wyant
 *
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "mahasiswa")
public class Mahasiswa {
	@Id
	@Column(name = "mhs_id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@Column(name = "mhs_nim")
	private String nim;
	
	@Column(name = "mhs_nama")
	private String nama;
	
	@Column(name = "mhs_alamat")
	private String alamat;
	
	@Column(name = "mhs_dob")
	private String dob;
	
}
